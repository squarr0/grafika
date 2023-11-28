function plotEllipseNaive(rx, ry, xc, yc, ctx) {
    ctx.beginPath();
    for (let x = -rx; x <= rx; x++) {
        let y = ry * Math.sqrt(1 - (x / rx) ** 2);
        ctx.fillStyle = 'red';
        ctx.fillRect(xc + x, yc + y, 1, 1);
        ctx.fillRect(xc + x, yc - y, 1, 1);
    }
}

function plotEllipseBresenham(rx, ry, xc, yc, ctx) {
    ctx.beginPath();
    let x = 0;
    let y = ry;

    let d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx);
    let dx = 2 * ry * ry * x;
    let dy = 2 * rx * rx * y;

    while (dx < dy) {
        ctx.fillRect(xc + x, yc + y, 1, 1);
        ctx.fillRect(xc - x, yc + y, 1, 1);
        ctx.fillRect(xc + x, yc - y, 1, 1);
        ctx.fillRect(xc - x, yc - y, 1, 1);

        if (d1 < 0) {
            x++;
            dx = dx + (2 * ry * ry);
            d1 = d1 + dx + (ry * ry);
        } else {
            x++;
            y--;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d1 = d1 + dx - dy + (ry * ry);
        }
    }

    let d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) + ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry);
    
    while (y >= 0) {
        ctx.fillRect(xc + x, yc + y, 1, 1);
        ctx.fillRect(xc - x, yc + y, 1, 1);
        ctx.fillRect(xc + x, yc - y, 1, 1);
        ctx.fillRect(xc - x, yc - y, 1, 1);

        if (d2 > 0) {
            y--;
            dy = dy - (2 * rx * rx);
            d2 = d2 + (rx * rx) - dy;
        } else {
            y--;
            x++;
            dx = dx + (2 * ry * ry);
            d2 = d2 + dx - dy + (rx * rx);
        }
    }
}

function drawAndCompare(rx, ry, xc, yc) {
    let canvasNaive = document.getElementById('canvasNaive');
    let ctxNaive = canvasNaive.getContext('2d');
    let startNaive = performance.now();
    plotEllipseNaive(rx, ry, xc, yc, ctxNaive);
    let endNaive = performance.now();

    let canvasBresenham = document.getElementById('canvasBresenham');
    let ctxBresenham = canvasBresenham.getContext('2d');
    let startBresenham = performance.now();
    plotEllipseBresenham(rx, ry, xc, yc, ctxBresenham);
    let endBresenham = performance.now();

    let naiveTime = endNaive - startNaive;
    let bresenhamTime = endBresenham - startBresenham;

    let timesDiv = document.getElementById('times');
    timesDiv.innerHTML = `Czas wykonania algorytmu naiwnego: ${naiveTime.toFixed(2)} ms<br>
                          Czas wykonania algorytmu Bresenhama: ${bresenhamTime.toFixed(2)} ms`;
}

drawAndCompare(200, 100, 400, 300); // Przykładowe wartości
