const animateButton = document.getElementById("animateButton");
animateButton.addEventListener("click", function() {
    const spriteHeight = document.getElementById("spriteHeight").value;
    const spriteWidth = document.getElementById("spriteWidth").value;
    const frames = document.getElementById("frames").value;
    const speed = document.getElementById("speed").value;
    const file = document.getElementById("fileInput").files[0];
    createAndAnimate(file, spriteHeight, spriteWidth, frames, speed);
});

function createAndAnimate(file, spriteHeight, spriteWidth, frames, speed) {
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
        // set canvas dimensions based on sprite width and heightth;
        canvas.width = spriteWid
        canvas.height = spriteHeight;
        let currentFrame = 0;
        function animate() {
            ctx.clearRect(0, 0, spriteWidth, spriteHeight);
             // draw the current frame of the sprite image
            ctx.drawImage(img, currentFrame * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
            // increase the current frame and loop back to the first frame if necessary
            //make sure  that the animation stays within the range of available frames
            currentFrame = (currentFrame + 1) % frames;
            if (fileInput.files.length === 0) {
                clearCanvas();
                console.log("No image file has been selected");
            } else {
                setTimeout(animate, speed);
            }
        }
        animate();
    };
    canvasContainer.appendChild(canvas);
}