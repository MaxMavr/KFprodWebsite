const RAD_TO_DEG = 180;
const PERSPECTIVE_MULTIPLIER = 2;
const SENSITIVITY = 2.5;
const CUBE_SIDES = ['left', 'right', 'top', 'bottom'];

const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.7;
const EPSILON = 0.01;
const velocity = { x: 0, y: 0 };

const logo = document.querySelector('.logo-cube');
const cube = document.querySelector('.cube');

const rotation = { x: 0, y: 0 };
const targetRotation = { x: 0, y: 0 };

let animationId = null;


function createCubeSides() {
  CUBE_SIDES.forEach(side => {
    const sideDiv = document.createElement('div');
    sideDiv.classList.add('side', side);
    cube.appendChild(sideDiv);
  });
}

function applyTransform() {
  const transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  cube.style.transform = transform;
}

function resetRotation() {
  targetRotation.x = 0;
  targetRotation.y = 0;
}

function updateCubeParameters() {
  const height = logo.clientHeight;
  const perspective = `${PERSPECTIVE_MULTIPLIER * height}px`;
  
  logo.style.perspective = perspective;
  logo.style.webkitPerspective = perspective;
  
  const origin = `${height / 2}px ${height / 2}px ${height / -2}px`;
  cube.style.setProperty('--cube-origin', origin);
}

function calculateRotation(event) {
  const { clientX, clientY } = event;
  const { clientWidth, clientHeight, offsetTop, offsetLeft } = logo;
  
  const centerX = clientWidth / 2 + offsetLeft;
  const centerY = clientHeight / 2 + offsetTop;
  
  const angleX = Math.atan((clientY - centerY) / (SENSITIVITY * clientHeight));
  const angleY = Math.atan((clientX - centerX) / (SENSITIVITY * clientHeight));

  return {
    x: -RAD_TO_DEG * angleX,
    y: RAD_TO_DEG * angleY
  };
}


function animate() {
  const ax = (targetRotation.x - rotation.x) * SPRING_STIFFNESS;
  const ay = (targetRotation.y - rotation.y) * SPRING_STIFFNESS;
  
  velocity.x += ax;
  velocity.y += ay;
  
  velocity.x *= SPRING_DAMPING;
  velocity.y *= SPRING_DAMPING;
  
  rotation.x += velocity.x;
  rotation.y += velocity.y;
  
  applyTransform();
  
  const dx = Math.abs(targetRotation.x - rotation.x);
  const dy = Math.abs(targetRotation.y - rotation.y);
  const vx = Math.abs(velocity.x);
  const vy = Math.abs(velocity.y);
  
  if (dx < EPSILON && dy < EPSILON && vx < EPSILON && vy < EPSILON) {
    rotation.x = targetRotation.x;
    rotation.y = targetRotation.y;
    velocity.x = 0;
    velocity.y = 0;
    applyTransform();
    animationId = null;
  } else {
    animationId = requestAnimationFrame(animate);
  }
}

function startAnimation() {
  if (animationId === null) {
    animationId = requestAnimationFrame(animate);
  }
}

function createRotationHandler() {
  return function(event) {
    const newRotation = calculateRotation(event);
    targetRotation.x = newRotation.x;
    targetRotation.y = newRotation.y;
    startAnimation();
  };
}

function initLogoCube() {
  createCubeSides();
  updateCubeParameters();
  
  const handleRotation = createRotationHandler();
  
  const resizeObserver = new ResizeObserver(updateCubeParameters);
  resizeObserver.observe(logo);
  
  cube.addEventListener('pointerleave', resetRotation);
  cube.addEventListener('mousemove', handleRotation, { passive: true });
}

document.addEventListener('DOMContentLoaded', initLogoCube);
