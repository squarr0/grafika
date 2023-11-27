function drawSierpinski(turtle, order, size) {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');
    if (order === 0) {
        for (let i = 0; i < 3; i++) {
            turtle.forward(size, ctx);
            turtle.turn(120); // Obrót o 120 stopni, aby narysować równoboczny trójkąt
        }
    } else {
        // Rysujemy 3 trójkąty mniejszego rzędu
        size /= 2;
        turtle.penDown();
        drawSierpinski(turtle, order - 1, size);
        turtle.penUp();
        turtle.forward(size, ctx);
        turtle.penDown();
        drawSierpinski(turtle, order - 1, size);
        turtle.penUp();
        turtle.forward(-size, ctx);
        turtle.turn(60);
        turtle.forward(size, ctx);
        turtle.turn(-60);
        turtle.penDown();
        drawSierpinski(turtle, order - 1, size);
        turtle.penUp();
        turtle.turn(60);
        turtle.forward(-size, ctx);
        turtle.turn(-60);
    }
}

function drawKoch(turtle, order, size) {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');
    if (order == 0) {
        turtle.forward(size, ctx);
    } else {
        size /= 3;
        drawKoch(turtle, order - 1, size);
        turtle.turn(-60);
        drawKoch(turtle, order - 1, size);
        turtle.turn(120);
        drawKoch(turtle, order - 1, size);
        turtle.turn(-60);
        drawKoch(turtle, order - 1, size);
    }
}

function drawFractal() {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const turtle = new Turtle(400, 300, 0);
    const fractalType = document.getElementById('fractal').value;
    const degree = parseInt(document.getElementById('degree').value);

    if (fractalType === 'sierpinski') {
        turtle.penUp();
        turtle.moveTo(300, 300);
        turtle.penDown();
        drawSierpinski(turtle, degree, 300);
    } else if (fractalType === 'koch') {
        turtle.penUp();
        turtle.moveTo(100, 100);
        turtle.penDown();
        for (let i = 0; i < 3; i++) {
            drawKoch(turtle, degree, 600);
            turtle.turn(-120);
        }
    }
}