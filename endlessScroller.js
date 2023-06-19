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
  
  // remove any existing canvas from the canvas container
  while (canvasContainer.firstChild) {
    canvasContainer.removeChild(canvasContainer.firstChild);
  }
  
  // make a new canvas element and set its dimensions based on inputs
  const canvas = document.createElement('canvas');
  canvas.width = viewportWidth;
  canvas.height = imgHeight;
  canvasContainer.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  const img = new Image();
  img.src = URL.createObjectURL(fileInput.files[0]);
  img.onload = function() {
    // initialize the x coordinates for two images, so that they are seamlessly connected
    let x1 = 0;
    let x2 = imgWidth;

    //console.log(imgWidth);
    //console.log(x2);
    
    ///draw the images and animate the scrolling effect
    function draw() {
      ctx.clearRect(0, 0, viewportWidth, imgHeight);
      
      // draw the two images side by side
      ctx.drawImage(img, x1, 0, imgWidth, imgHeight);
      ctx.drawImage(img, x2, 0, imgWidth, imgHeight);
      
      // update the x coordinates based on the scroll speed
      x1 -= scrollSpeed;
      x2 -= scrollSpeed;
      
       // Check if the  images has scrolled off the viewport, if so reset the x coordinate

      if (x1 <= -imgWidth) {
        x1 = x2 + imgWidth;
      }
      
      if (x2 <= -imgWidth) {
        x2 = x1 + imgWidth;
      }
      
      //console.log("x1: " + x1)
      //console.log("x2: " + x2)
      requestAnimationFrame(draw);
    }
    
    draw();
  }
});