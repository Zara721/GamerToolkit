const imgHeightInput = document.getElementById('imgHeight');
const imgWidthInput = document.getElementById('imgWidth');
const viewportWidthInput = document.getElementById('viewportWidth');
const scrollSpeedInput = document.getElementById('scrollSpeed');

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const layers = [];
let gameSpeed = 1;

class Layer {
  constructor(width, height, image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    console.log(this.x);
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }
    this.x = Math. floor (this.x - this.speed);
    this.x2 = Math. floor (this.x2 - this.speed);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

function addLayer() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const img = new Image();
  
  img.onload = () => {
    const layer = new Layer(img.width, img.height, img, 0.5);
    layers.push(layer);
    canvas.width = viewportWidthInput.value;
    canvas.height = img.height;
  };
  img.src = URL.createObjectURL(file);
}

function clearLayers() {
  layers.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLayers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  layers.forEach(layer => {
    layer.update();
    layer.draw();
  });
}

function updateGameSpeed() {
  const scrollSpeed = document.getElementById('scrollSpeed').value;
  gameSpeed = scrollSpeed / 5;
}

function init() {
  canvas.style.position = 'fixed';
  canvas.style.zIndex = '-1';
  document.getElementById('newLayerBtn').addEventListener('click', addLayer);
  document.getElementById('clearBtn').addEventListener('click', clearLayers);
  document.getElementById('scrollSpeed').addEventListener('input', updateGameSpeed);
  document.addEventListener('DOMContentLoaded', () => {
    init();
  });
  gameLoop(); 
}


function gameLoop() {
  drawLayers();
  requestAnimationFrame(gameLoop);
}

init();
requestAnimationFrame(gameLoop);

