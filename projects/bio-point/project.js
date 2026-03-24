const ILLUSTRATION = document.getElementById('illustration');
const LEAVES = Array.from(ILLUSTRATION.querySelectorAll('.leaf'));

const BASE_PARAMS = {
  maxRotation: 0.55,
  stiffness: 0.24,
  damping: 0.24,
  influenceRadius: 420,
  bounce: 0.005,
  returnSpeed: 0.93
};

const randomRange = (min, max) => min + Math.random() * (max - min);

const LEAF_STATES = LEAVES.map(leaf => {
  const stem = leaf.querySelector('circle');
  
  if (!stem) {
    console.warn('Leaf missing stem circle:', leaf);
    return null;
  }
  
  const pivot = {
    x: parseFloat(stem.getAttribute('cx')),
    y: parseFloat(stem.getAttribute('cy'))
  };
  
  const variation = {
    maxRotation: randomRange(0.7, 1.4),
    stiffness: randomRange(0.8, 1.25),
    damping: randomRange(0.85, 1.15),
    influenceRadius: randomRange(0.7, 1.4),
    bounce: randomRange(0.3, 2.0),
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: randomRange(0.7, 1.4)
  };
  
  return {
    element: leaf,
    pivot,
    angle: 0,
    velocity: 0,
    targetAngle: 0,
    baseAngle: 0,
    variation
  };
}).filter(Boolean);


let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  const rect = ILLUSTRATION.getBoundingClientRect();
  const viewBox = ILLUSTRATION.viewBox.baseVal;

  const scaleX = viewBox.width / rect.width;
  const scaleY = viewBox.height / rect.height;
  
  mouseX = (e.clientX - rect.left) * scaleX;
  mouseY = (e.clientY - rect.top) * scaleY;
});


function updateLeafParam(leaf) {
  const p = {
    maxRotation: BASE_PARAMS.maxRotation * leaf.variation.maxRotation,
    stiffness: BASE_PARAMS.stiffness * leaf.variation.stiffness,
    damping: BASE_PARAMS.damping * leaf.variation.damping,
    influenceRadius: BASE_PARAMS.influenceRadius * leaf.variation.influenceRadius,
    bounce: BASE_PARAMS.bounce * leaf.variation.bounce,
    returnSpeed: BASE_PARAMS.returnSpeed
  };
  
  const dx = mouseX - leaf.pivot.x;
  const dy = mouseY - leaf.pivot.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < p.influenceRadius && distance > 5) {
    const force = 1 - distance / p.influenceRadius;
    const angle = Math.atan2(dy, dx);

    const phaseOffset = Math.sin(leaf.variation.phase) * 0.3;
    leaf.targetAngle = -Math.sin(angle + phaseOffset) * p.maxRotation * force;
  } else {
    leaf.targetAngle *= p.returnSpeed;
    if (Math.abs(leaf.targetAngle) < 0.001) leaf.targetAngle = 0;
  }
  
  const springForce = (leaf.targetAngle - leaf.angle) * p.stiffness;
  leaf.velocity += springForce;
  leaf.velocity *= p.damping;
  leaf.angle += leaf.velocity;
  
  if (Math.abs(leaf.velocity) > 0.002) {
    leaf.angle += (Math.random() - 0.5) * p.bounce;
  }
  
  const degrees = leaf.angle * 180 / Math.PI;
  leaf.element.setAttribute(
    'transform', 
    `rotate(${degrees} ${leaf.pivot.x} ${leaf.pivot.y})`
  );
}

function animate() {
  for (const leaf of LEAF_STATES) {
    updateLeafParam(leaf);
  }
  requestAnimationFrame(animate);
}


animate();