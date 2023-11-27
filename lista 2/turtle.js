class Turtle {
    constructor(x, y, angle, ctx) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.ctx = ctx;
        this.ifPenDown = false;
        this.color = "#000000";
    }

    penUp() {
        this.ifPenDown = false;
    }

    penDown() {
        this.ifPenDown = true;
    }

    forward(d) {
        const newX = this.x + d * Math.cos(this.angle * Math.PI / 180);
        const newY = this.y - d * Math.sin(this.angle * Math.PI / 180);
        if (this.ifPenDown) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(newX, newY);
            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
        }
        this.x = newX;
        this.y = newY;
    }

    turn(alpha) {
        this.angle += alpha;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
}