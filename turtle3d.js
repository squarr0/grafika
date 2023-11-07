const canvas = document.getElementById('turtleCanvas');
const ctx = canvas.getContext('2d');

let cameraRotation = 0;
let path = [];

class Turtle3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
    }

    forward(distance) {
        // Zaktualizuj pozycję żółwia bazując na jego rotacji i dystansie
        this.x += distance * Math.cos(this.rotationY) * Math.cos(this.rotationZ);
        this.y += distance * Math.cos(this.rotationY) * Math.sin(this.rotationZ);
        this.z += distance * Math.sin(this.rotationY);
    }

    turnLeft(angle) {
        this.rotationZ += angle * Math.PI / 180;
    }

    turnRight(angle) {
        this.rotationZ -= angle * Math.PI / 180;
    }

    turnUp(angle) {
        this.rotationY -= angle * Math.PI / 180;
    }

    turnDown(angle) {
        this.rotationY += angle * Math.PI / 180;
    }

    draw() {
        // Przekonwertuj koordynaty 3D na 2D używając prostego rzutu prostokątnego
        const x2d = this.x - this.z * Math.cos(cameraRotation);
        const y2d = this.y - this.z * Math.sin(cameraRotation);
        
        path.push({x: x2d, y: y2d});
        
        ctx.beginPath();
        for (let i = 1; i < path.length; i++) {
            ctx.moveTo(path[i - 1].x, path[i - 1].y);
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
    }
}

const turtle = new Turtle3D(400, 300, 0);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    turtle.draw();
    turtle.forward(1);
    turtle.turnRight(0.5);
    turtle.turnUp(0.25);
    requestAnimationFrame(draw);
}

function rotateView(angle) {
    cameraRotation += angle * Math.PI / 180;
}

draw();