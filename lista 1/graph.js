function drawCompleteGraph(n) {
    if (isNaN(n)) {
        alert('Proszę wprowadzić prawidłową wartość dla n.');
        return;
    }
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = 200;
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const vertices = [];

    for (let i = 0; i < n; i++) {
        const angle = (i / n) * 2 * Math.PI;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        vertices.push({ x, y });
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            ctx.beginPath();
            ctx.moveTo(vertices[i].x, vertices[i].y);
            ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.stroke();
        }
    }
}

function drawBipartiteGraph(m, n) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const spacing = 50;
    const offset = 100;
    const verticesA = [];
    const verticesB = [];

    for (let i = 0; i < m; i++) {
        verticesA.push({ x: offset, y: offset + i * spacing });
    }

    for (let i = 0; i < n; i++) {
        verticesB.push({ x: canvas.width - offset, y: offset + i * spacing });
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ctx.beginPath();
            ctx.moveTo(verticesA[i].x, verticesA[i].y);
            ctx.lineTo(verticesB[j].x, verticesB[j].y);
            ctx.stroke();
        }
    }
}

// function drawGraphs() {
//     const n = parseInt(document.getElementById('nInput').value);
//     const m = parseInt(document.getElementById('mInput').value);
//     if (isNaN(n) || isNaN(m)) {
//         alert('Proszę wprowadzić prawidłowe wartości dla n i m.');
//         return;
//     }
//     //drawCompleteGraph(n);
//     drawBipartiteGraph(m, n);
// }