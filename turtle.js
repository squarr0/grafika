class Turtle {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.ifPenDown = false;
        this.color = "000000";
    }

    penUp() {
        this.ifPenDown = false;
    }

    penDown() {
        this.ifPenDown = true;
    }

    forward(d, ctx) {
        const newX = this.x + d * Math.cos(this.angle * Math.PI / 180);
        const newY = this.y - d * Math.sin(this.angle * Math.PI / 180);
        if (this.ifPenDown) {
            //console.log(`Rysowanie linii od (${this.x}, ${this.y}) do (${newX}, ${newY})`);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(newX, newY);
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }
        this.x = newX;
        this.y = newY;
    }

    turn(alpha) {
        this.angle += alpha;
    }

    // moveTo(newX, newY) {
    //     if (this.ifPenDown) {
    //         ctx.beginPath();
    //         ctx.moveTo(this.x, this.y);
    //         ctx.lineTo(newX, newY);
    //         ctx.strokeStyle = this.color;
    //         ctx.stroke();
    //     }
    //     this.x = newX;
    //     this.y = newY;
    // }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawPolygon(sides, color) {
    const canvas = document.getElementById('turtleCanvas');
    const ctx = canvas.getContext('2d');
    const turtle = new Turtle(400, 300, 0);

    turtle.color = color;
    turtle.penDown();
    for (let i = 0; i < sides; i++) {  // Rysowanie wielokąta foremnego
        turtle.forward(200, ctx);
        turtle.turn(360/sides);
    }
}

//drawPolygon(5);