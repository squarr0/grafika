const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const NUM_COLS = 5;
const NUM_ROWS = 4;
const CARD_WIDTH = 120;
const CARD_HEIGHT = 160;
const SPACING = 5;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let cards = [...Array(10).keys(), ...Array(10).keys()];
let revealedCards = Array(20).fill(false);
let currentTurn = 0;
let selectedCards = [];
let points = [0, 0];
let game_over = false;

let loadingImages = 0; // Licznik ładowania grafik
let imagesLoaded = false; // Flaga wskazująca, czy wszystkie grafiki zostały załadowane
let clickDisabled = false; // Flaga blokująca kliknięcia

let cardImages = [];
for (let i = 0; i < 10; i++) {
    let img = new Image();
    img.src = `memory_graphics/card_${i}.png`;
    cardImages.push(img);
}

function imageLoaded() {
    loadingImages--;
    if (loadingImages === 0) {
        imagesLoaded = true;
        drawBoard();
    }
}

// Ładowanie grafik kart
for (let i = 0; i < 10; i++) {
    loadingImages++;
    let img = new Image();
    img.onload = imageLoaded;
    img.src = `memory_graphics/card_${i}.png`;
    cardImages.push(img);
}

// Ładowanie grafiki tylnej strony karty
loadingImages++;
let cardBackImage = new Image();
cardBackImage.onload = imageLoaded;
cardBackImage.src = `memory_graphics/card_back.png`;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < cards.length; i++) {
        const row = Math.floor(i / NUM_COLS);
        const col = i % NUM_COLS;
        const x = col * (CARD_WIDTH + SPACING) + SPACING;
        const y = row * (CARD_HEIGHT + SPACING) + SPACING;

        if (revealedCards[i]) {
            ctx.drawImage(cardImages[cards[i]], x, y, CARD_WIDTH, CARD_HEIGHT);
        } else {
            ctx.drawImage(cardBackImage, x, y, CARD_WIDTH, CARD_HEIGHT);
        }
    }

    // Wyświetlanie punktów
    document.getElementById("pointsInfo").innerText = `Punkty - Gracz 1: ${points[0]}, Gracz 2: ${points[1]}`;
}

function handleMouseClick(evt) {
    if (clickDisabled || !imagesLoaded) {
        return;  // Blokada kliknięć, jeśli kliknięcia są wyłączone lub grafiki nie zostały załadowane
    }

    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    const clickedCol = Math.floor(x / (CARD_WIDTH + SPACING));
    const clickedRow = Math.floor(y / (CARD_HEIGHT + SPACING));
    const clickedIndex = clickedRow * NUM_COLS + clickedCol;

    if (clickedIndex < 20 && !revealedCards[clickedIndex]) {
        revealedCards[clickedIndex] = true;
        selectedCards.push(clickedIndex);

        if (selectedCards.length === 2) {
            // Blokujemy możliwość kolejnego kliknięcia
            clickDisabled = true;

            setTimeout(() => {
                const firstCardIndex = selectedCards[0];
                const secondCardIndex = selectedCards[1];

                if (cards[firstCardIndex] !== cards[secondCardIndex]) {
                    // Jeśli karty nie są parą, ukrywamy je
                    revealedCards[firstCardIndex] = false;
                    revealedCards[secondCardIndex] = false;
                } else {
                    // Dodanie punktów, jeśli karty są parą
                    points[currentTurn]++;
                }

                selectedCards = [];
                currentTurn = 1 - currentTurn;
                clickDisabled = false;
                drawBoard();
            }, 1000);
        }
    }

    drawBoard();
}

// Funkcja opóźnienia przed zakryciem kart
function delayHideCards(firstCardIndex, secondCardIndex) {
    clickDisabled = true;
    setTimeout(() => {
        revealedCards[firstCardIndex] = false;
        revealedCards[secondCardIndex] = false;
        selectedCards = [];
        currentTurn = 1 - currentTurn;
        clickDisabled = false;
        drawBoard();
    }, 1000);
}

function main() {
    if (loadingImages === 0) { // Jeśli wszystkie grafiki zostały załadowane
        imagesLoaded = true;
        drawBoard();
        canvas.addEventListener("click", handleMouseClick);
    }
}

// Sprawdzenie, czy grafiki zostały załadowane, co 100 ms
let checkImagesLoaded = setInterval(() => {
    if (imagesLoaded) {
        clearInterval(checkImagesLoaded);
        main();
    }
}, 100);

shuffleArray(cards);