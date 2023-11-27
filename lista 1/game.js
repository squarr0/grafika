const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 50, width: 20, height: 20 };
let goal = { x: 700, y: 500, width: 20, height: 20 };
let obstacles = generateObstacles(10);

function generateObstacles(numObstacles) {
    let obstacles = [];
    for (let i = 0; i < numObstacles; i++) {
        let width = Math.random() * 50 + 50;
        let height = Math.random() * 50 + 50;
        let x = Math.random() * (canvas.width - width);
        let y = Math.random() * (canvas.height - height);
        obstacles.push({ x, y, width, height });
    }
    return obstacles;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysuj gracza
    ctx.fillStyle = "rgba(0, 0, 0, 255)"
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Rysuj cel
    ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

    // Rysuj przeszkody
    for (let obstacle of obstacles) {
        ctx.fillStyle = "rgba(255, 255, 255, 200)"
        // ctx.moveTo(obstacle.x, obstacle.y);
        // ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        // ctx.moveTo(obstacle.x + obstacle.width, obstacle.y);
        // ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        // ctx.stroke();
    }

    requestAnimationFrame(draw);
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

function handleKeyDown(e) {
    const speed = 5;
    let newX = player.x;
    let newY = player.y;

    switch (e.key) {
        case 'ArrowUp': newY -= speed; break;
        case 'ArrowDown': newY += speed; break;
        case 'ArrowLeft': newX -= speed; break;
        case 'ArrowRight': newX += speed; break;
    }

    const newPlayer = { x: newX, y: newY, width: player.width, height: player.height };

    let collision = false;
    for (let obstacle of obstacles) {
        if (isColliding(newPlayer, obstacle)) {
            collision = true;
            break;
        }
    }

    if((newPlayer.x < 0 || newPlayer.x + newPlayer.width > 800) || (newPlayer.y < 0 || newPlayer.y + newPlayer.height > 600)) collision = true;

    if (!collision) {
        player.x = newX;
        player.y = newY;
    }

    checkGoal();
}

function checkGoal() {
    if (isColliding(player, goal)) {
        alert('Brawo! Udało Ci się dotrzeć do mety.');
        resetGame();
    }
}

function resetGame() {
    player.x = 50;
    player.y = 50;
    goal.x = 700;
    goal.y = 500;
    obstacles = generateObstacles(10);
}

window.addEventListener('keydown', handleKeyDown);
requestAnimationFrame(draw);