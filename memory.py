import pygame
import os
import random

# Inicjalizacja Pygame
pygame.init()

# Ustawienia okna gry
WIDTH, HEIGHT = 630, 800
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Gra Memory")

# Ładowanie grafik kart
CARD_BACK = pygame.image.load(os.path.join('memory_graphics', 'card_back.png'))
CARD_IMAGES = [pygame.image.load(os.path.join('memory_graphics', f'card_{i}.png')) for i in range(10)]

# Stałe
NUM_COLS = 5
NUM_ROWS = 4
CARD_WIDTH = CARD_IMAGES[0].get_width()
CARD_HEIGHT = CARD_IMAGES[0].get_height()
SPACING = 5  # Odstęp między kartami

# Zmienne gry
cards = [(i // 2) for i in range(20)]  # 10 par kart
random.shuffle(cards)  # Mieszanie kart
revealed_cards = [False] * 20  # Stan każdej karty (odkryta/zakryta)
current_turn = 0  # Który gracz obecnie wykonuje ruch
selected_cards = []  # Wybrane karty w obecnym ruchu
points = [0, 0]  # Punkty dla graczy 0 i 1

# Funkcja do rysowania planszy
def draw_board():
    WIN.fill((255, 255, 255))  # Białe tło
    for i in range(20):
        row = i // NUM_COLS
        col = i % NUM_COLS
        x = col * (CARD_WIDTH + SPACING) + SPACING
        y = row * (CARD_HEIGHT + SPACING) + SPACING

        if revealed_cards[i]:
            WIN.blit(CARD_IMAGES[cards[i]], (x, y))
        else:
            WIN.blit(CARD_BACK, (x, y))

    # Wyświetlanie punktów graczy
    font = pygame.font.SysFont(None, 36)
    points_text = f"Punkty - Gracz 1: {points[0]}  Gracz 2: {points[1]}"
    text_surface = font.render(points_text, True, (0, 0, 0))
    WIN.blit(text_surface, (WIDTH // 2 - text_surface.get_width() // 2, 710))

    pygame.display.update()

# Funkcja do obsługi kliknięć
def handle_click(pos):
    global current_turn, selected_cards, points
    col = pos[0] // (CARD_WIDTH + SPACING)
    row = pos[1] // (CARD_HEIGHT + SPACING)
    index = row * NUM_COLS + col

    if 0 <= index < 20 and not revealed_cards[index] and len(selected_cards) < 2:
        revealed_cards[index] = True
        selected_cards.append(index)

        if len(selected_cards) == 2:
            draw_board()  # Rysowanie planszy z odkrytymi kartami
            pygame.time.delay(1000)  # Opóźnienie, aby gracze mogli zobaczyć karty

            if cards[selected_cards[0]] == cards[selected_cards[1]]:
                points[current_turn] += 1  # Dodanie punktu dla gracza
            else:
                # Zakrycie kart
                revealed_cards[selected_cards[0]] = False
                revealed_cards[selected_cards[1]] = False

            selected_cards = []
            current_turn = 1 - current_turn  # Zmiana tury
            draw_board()  # Ponowne rysowanie planszy po zakryciu kart

def display_game_over():
    WIN.fill((255, 255, 255))  # Białe tło
    font = pygame.font.SysFont(None, 60)
    if points[0] == points[1]: text = font.render(f"Remis!", True, (0, 0, 0))
    else:   
        winner = 0 if points[0] > points[1] else 1
        text = font.render(f"Wygrał gracz {winner + 1}! Punkty: {points[winner]}", True, (0, 0, 0))
    WIN.blit(text, (WIDTH // 2 - text.get_width() // 2, HEIGHT // 2 - text.get_height() // 2))
    pygame.display.update()
    pygame.time.wait(5000)  # Wyświetl ekran końcowy przez 5 sekund

# Główna pętla gry
def main():
    run = True
    clock = pygame.time.Clock()

    while run:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                handle_click(pygame.mouse.get_pos())

        draw_board()

        if not any(not c for c in revealed_cards):  # Sprawdź, czy wszystkie karty są odkryte
            display_game_over()

    pygame.quit()

if __name__ == "__main__":
    main()
