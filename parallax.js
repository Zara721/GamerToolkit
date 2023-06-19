const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas. height = 700;
let gameSpeed = 5


class Layer {
    constructor (width, height, image, speedModifier){
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
        this.speed - gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
        this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
        this.x2 = this.width + this.x - this.speed;
        this.x = Math. floor (this.x - this.speed);
        this.x2 = Math. floor (this.x2
        - this.speed);
        }
    }

    draw(){
        ctx.drawImage (this.image, this.x, this.y, this.width, this.height); 
        ctx.drawImage (this.image, this.x2, this.y, this.width, this .height);
    }
}

const layer1 = new Layer (backgroundLayer1, 0.2);
const layer2 = new Layer (backgroundLayer2, 0.4);
const layer3 = new Layer (backgroundLayer3, 0.6);
const layer4 = new Layer (backgroundLayer4, 0.8);
const layers = new Layer (backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layers];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) ;
    gameObjects.forEach(object => {
    object.update();
    object.draw();
    });
    requestAnimationFrame (animate);
};
animate ();
