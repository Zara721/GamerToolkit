const cvsFile = document.getElementById("cvsInput");
const animateBtn = document.getElementById("animateButton");

const searchTool = document.getElementById("searchTool");

let header = [];
let animations = [];
let spriteAnimations = [];

cvsFile.addEventListener('change', () => {
  // read the contents of the selected file
  const fileReader = new FileReader();
  fileReader.readAsText(cvsFile.files[0]); 
  fileReader.onload = function () {
    const text = fileReader.result;
    const lines = text.split('\n');

    // split the first line (header) and second line (animations)
    header = lines[0].split(',');
    animations = lines[1].split(',');

    createSelector(header);
  }
});

// creates the search tool selector with all the animation names based on the header contents
function createSelector(header) {
    console.log("header: " + header)
    // remove all existing options
    while (searchTool.firstChild) {
      searchTool.removeChild(searchTool.firstChild);
    }
    
    // create options for each header item
    for (let i = 0; i < header.length; i++) {
      let newOption = document.createElement("option");
      newOption.value = header[i];
      newOption.text = header[i];
      searchTool.appendChild(newOption);
    }
  
    searchTool.addEventListener('change', () => {
      getAnimationParameters(header);
    });
}  

// function to get the animation parameters based on the selected header
function getAnimationParameters() {
  const animation = searchTool.value;
  let index = header.indexOf(animation);
  console.log(index);
  console.log(animations[index]);
  populateAnimationStates();
}

// function made to populate the sprite animations based on the animation parameters
function populateAnimationStates() {
    const indSpriteHeight = parseInt(document.getElementById("spriteHeight").value);
    const indSpriteWidth = parseInt(document.getElementById("spriteWidth").value);

    spriteAnimations = [];
  
    const numFrames = animations.map(Number);
    for (let i = 0; i < header.length; i++) {
      const animationFrames = numFrames[i];
      const frameCoordinates = [];
      for (let j = 0; j < animationFrames; j++) {
        const positionX = j * indSpriteWidth;
        const positionY = i * indSpriteHeight;
        frameCoordinates.push({x: positionX, y: positionY});
      }
      spriteAnimations[header[i]] = {coordinates: frameCoordinates};
    }
  
    console.log(spriteAnimations);
}
  

animateBtn.addEventListener("click", function() {
    const file = document.getElementById("fileInput").files[0];
    const spriteHeight = parseInt(document.getElementById("spriteHeight").value);
    const spriteWidth = parseInt(document.getElementById("spriteWidth").value);
    const speed = parseInt(document.getElementById("speed").value);
    const animationName = document.getElementById("searchTool").value;
    createAndAnimate(file, spriteHeight, spriteWidth, speed, animationName);
  });
  
 // fn to create and animate the sprite based on the input parameters
function createAndAnimate(file, spriteHeight, spriteWidth, speed, animationName) {
    const canvasContainer = document.querySelector(".canvas-container");
    // check if there's an existing canvas and delete it
    while (canvasContainer.firstChild) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }
  
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function() {
      canvas.width = spriteWidth;
      canvas.height = spriteHeight;
      let currentFrame = 0;
      const framePositions = spriteAnimations[animationName].coordinates;
      function animate() {
        ctx.clearRect(0, 0, spriteWidth, spriteHeight);
        ctx.drawImage(img, framePositions[currentFrame].x, framePositions[currentFrame].y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        currentFrame++;
        if (currentFrame >= framePositions.length) {
          currentFrame = 0;
        }
        setTimeout(animate, speed);
      }
      animate();
    };
    canvasContainer.appendChild(canvas);
  }

