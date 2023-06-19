const imgHeightInput = document.getElementById('imgHeight');
const imgWidthInput = document.getElementById('imgWidth');
const viewportWidthInput = document.getElementById('viewportWidth');
const scrollSpeedInput = document.getElementById('scrollSpeed');
const animateButton = document.getElementById('animateButton');
const canvasContainer = document.querySelector('.canvas-container');

animateButton.addEventListener('click', () => {
  const imgHeight = imgHeightInput.value;
  const imgWidth = imgWidthInput.value;
  const viewportWidth = viewportWidthInput.value;
  const scrollSpeed = scrollSpeedInput.value;
  
  while (canvasContainer.firstChild) {
    canvasContainer.removeChild(canvasContainer.firstChild);
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = viewportWidth;
  canvas.height = imgHeight;
  canvasContainer.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  const img = new Image();
  img.src = URL.createObjectURL(fileInput.files[0]);
  img.onload = function() {
    let x1 = 0;
    let x2 = imgWidth;
    
    function draw() {
      ctx.clearRect(0, 0, viewportWidth, imgHeight);
      
      ctx.drawImage(img, x1, 0, imgWidth, imgHeight);
      ctx.drawImage(img, x2, 0, imgWidth, imgHeight);
      
      x1 -= scrollSpeed;
      x2 -= scrollSpeed;
      
      if (x1 <= -imgWidth) {
        x1 = x2 + imgWidth;
      }
      
      if (x2 <= -imgWidth) {
        x2 = x1 + imgWidth;
      }
      
      requestAnimationFrame(draw);
    }
    
    draw();
  }
});