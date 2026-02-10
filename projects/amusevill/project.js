const ILLUSTRATION = document.getElementById('illustration');
const ILLUSTRATION_CTM = ILLUSTRATION.getScreenCTM();
const FOREST = document.getElementById('forest');
const TREES = Array.from(FOREST.querySelectorAll('.tree'));

const params = {
  maxOffset: 15,         // Смещение
  stiffness: 0.24,       // Жесткость
  damping: 0.5,          // Затухание
  influenceRadius: 200,  // Радиус 
  bounce: 0.05           // Отскок
};

const TREE_STATES = TREES.map(tree => {
  const polygons = tree.querySelectorAll('polygon');
  const leftPoly = polygons[0];
  const rightPoly = polygons[1];
  
  const leftPoints = parsePoints(leftPoly.getAttribute('points'));
  const rightPoints = parsePoints(rightPoly.getAttribute('points'));
  
  const apex = findApex(leftPoints);
  
  return {
    leftPoly,
    rightPoly,
    leftPoints,
    rightPoints,
    apex: { x: apex.x, y: apex.y },
    offset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 }
  };
});

function parsePoints(pointsStr) {
  return pointsStr.trim().split(' ').map(point => {    
    const [x, y] = point.split(',').map(Number);
    return { x, y };
  });
}

function findApex(points) {
  let apex = { x: Infinity, y: Infinity };

  for (const point of points) {
    if (point.y < apex.y) {
      apex = { x: point.x, y: point.y };
    }
  }

  return apex;
}

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

function updateTreeParam(tree) {
  const dx = mouseX - tree.apex.x;
  const dy = mouseY - tree.apex.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < params.influenceRadius) {
    const force = (1 - distance / params.influenceRadius);

    const angle = Math.atan2(dy, dx);
    const targetX = - Math.cos(angle) * params.maxOffset * force;
    const targetY = - Math.sin(angle) * params.maxOffset * force;
    
    tree.targetOffset.x = targetX;
    tree.targetOffset.y = targetY;
  } else {
    tree.targetOffset.x = 0;
    tree.targetOffset.y = 0;
  }
  
  const springForceX = (tree.targetOffset.x - tree.offset.x) * params.stiffness;
  const springForceY = (tree.targetOffset.y - tree.offset.y) * params.stiffness;
  
  tree.velocity.x += springForceX;
  tree.velocity.y += springForceY;
  
  tree.velocity.x *= params.damping;
  tree.velocity.y *= params.damping;
  
  tree.offset.x += tree.velocity.x;
  tree.offset.y += tree.velocity.y;

  if (Math.abs(tree.velocity.x) > 0.1 || Math.abs(tree.velocity.y) > 0.1) {
    tree.offset.x += (Math.random() - 0.5) * params.bounce;
    tree.offset.y += (Math.random() - 0.5) * params.bounce;
  }

  return tree
}


function updateTrees() {
  for (const tree of TREE_STATES) {
    updateTreeParam(tree);
    updatePolygonPoints(tree);
  }
  requestAnimationFrame(updateTrees);
}


function updatePolygonPoints(tree) {
  const newLeftPoints = [...tree.leftPoints];
  newLeftPoints[2] = {
    x: tree.apex.x + tree.offset.x,
    y: tree.apex.y + tree.offset.y
  };
  tree.leftPoly.setAttribute('points', pointsToString(newLeftPoints));
  
  const newRightPoints = [...tree.rightPoints];
  newRightPoints[0] = { 
    x: tree.apex.x + tree.offset.x, 
    y: tree.apex.y + tree.offset.y 
  };
  tree.rightPoly.setAttribute('points', pointsToString(newRightPoints));
}


function pointsToString(points) {
  return points.map(p => `${p.x},${p.y}`).join(' ');
}


updateTrees();