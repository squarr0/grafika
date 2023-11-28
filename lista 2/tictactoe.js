const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const GRID_SIZE = 600;
const CELL_SIZE = GRID_SIZE / 3;
const GRID_POS = 100;
let current_player = "O";
let board = [["", "", ""], ["", "", ""], ["", "", ""]];
let game_over_message = "";

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie siatki
    ctx.beginPath();
    for (let i = 1; i <= 2; i++) {
        ctx.moveTo(GRID_POS + i * CELL_SIZE, GRID_POS);
        ctx.lineTo(GRID_POS + i * CELL_SIZE, GRID_POS + GRID_SIZE);
        ctx.moveTo(GRID_POS, GRID_POS + i * CELL_SIZE);
        ctx.lineTo(GRID_POS + GRID_SIZE, GRID_POS + i * CELL_SIZE);
    }
    ctx.stroke();

    // Rysowanie kółek i krzyżyków
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const cellX = GRID_POS + x * CELL_SIZE;
            const cellY = GRID_POS + y * CELL_SIZE;
            const symbol = board[y][x];
            if (symbol === "O") {
                ctx.beginPath();
                ctx.arc(cellX + CELL_SIZE / 2, cellY + CELL_SIZE / 2, CELL_SIZE / 2 - 10, 0, 2 * Math.PI);
                ctx.stroke();
            } else if (symbol === "X") {
                ctx.beginPath();
                ctx.moveTo(cellX + 10, cellY + 10);
                ctx.lineTo(cellX + CELL_SIZE - 10, cellY + CELL_SIZE - 10);
                ctx.moveTo(cellX + CELL_SIZE - 10, cellY + 10);
                ctx.lineTo(cellX + 10, cellY + CELL_SIZE - 10);
                ctx.stroke();
            }
        }
    }

    // Wyświetlanie informacji o grze
    document.getElementById("gameInfo").innerText = game_over_message ? game_over_message : `Kolejka gracza: ${current_player}`;
}

function handleMouseClick(evt) {
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left - GRID_POS;
    const y = evt.clientY - rect.top - GRID_POS;
    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);

    if (cellX >= 0 && cellX < 3 && cellY >= 0 && cellY < 3 && board[cellY][cellX] === "" && !game_over_message) {
        board[cellY][cellX] = current_player;
        if (checkGameOver()) {
            game_over_message = `Gracz ${current_player} wygrywa!`;
        } else if (checkDraw()) {
            game_over_message = "Remis!";
        } else {
            current_player = current_player === "O" ? "X" : "O";
        }
    } else if (game_over_message) {
        resetGame();
    }
    drawBoard();
}

function checkGameOver() {
    // Sprawdzanie wierszy
    for (let row = 0; row < 3; row++) {
        if (board[row][0] === current_player && board[row][1] === current_player && board[row][2] === current_player) {
            return true;
        }
    }

    // Sprawdzanie kolumn
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === current_player && board[1][col] === current_player && board[2][col] === current_player) {
            return true;
        }
    }

    // Sprawdzanie przekątnych
    if (board[0][0] === current_player && board[1][1] === current_player && board[2][2] === current_player) {
        return true;
    }
    if (board[0][2] === current_player && board[1][1] === current_player && board[2][0] === current_player) {
        return true;
    }

    return false;
}

function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "") {
                return false;  // Jeszcze są puste miejsca
            }
        }
    }
    return true;  // Brak pustych miejsc i nikt nie wygrał
}

function resetGame() {
    board = [["", "", ""], ["", "", ""], ["", "", ""]];
    current_player = "O";
    game_over_message = "";
    drawBoard();  // Rysowanie początkowego stanu planszy
}

canvas.addEventListener("click", handleMouseClick);
drawBoard();
