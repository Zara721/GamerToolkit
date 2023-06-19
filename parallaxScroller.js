const imgHeightInput = document.getElementById('imgHeight');
const imgWidthInput = document.getElementById('imgWidth');
const viewportWidthInput = document.getElementById('viewportWidth');
const scrollSpeedInput = document.getElementById('scrollSpeed');

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


// array to store the layers being drawn on the canvas
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

   // method to update the layer position
  update() {
    // calculate the current speed of the animation based on the game speed and speed modifier
    this.speed = gameSpeed * this.speedModifier;
    console.log(this.x);

     // check if the layer has scrolled off to the left, if so the reset!
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;

      // adjust the x coordinate of both parts of the layer to create a seamless scrolling effect
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }
    this.x = Math. floor (this.x - this.speed);
    this.x2 = Math. floor (this.x2 - this.speed);
  }

  // method to draw the layer to the canvas
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

// function to add a new layer
function addLayer() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const img = new Image();
  
  // make a new layer with the image dimensions and add it to the layers array
  img.onload = () => {
    const layer = new Layer(img.width, img.height, img, 0.5);
    layers.push(layer);
    // set the canvas width to the value of the viewport width input and the canvas height to the image height
    canvas.width = viewportWidthInput.value;
    canvas.height = img.height;
  };
  img.src = URL.createObjectURL(file);
}

// function to clear all layers, like erase the canvas
function clearLayers() {
  layers.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// function to draw all layers, make sure that the updated info being used
function drawLayers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  layers.forEach(layer => {
    layer.update();
    layer.draw();
  });
}

function updateGameSpeed() {
  // fet the scroll speed from the input element and update the game speed
  const scrollSpeed = document.getElementById('scrollSpeed').value;
  gameSpeed = scrollSpeed / 5;
}

function init() {
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

