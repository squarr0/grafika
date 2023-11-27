import pygame
import os

# Inicjalizacja Pygame
pygame.init()

# Ustawienia okna gry
WIDTH, HEIGHT = 800, 800
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Gra w Kółko i Krzyżyk")

# Stałe
GRID_POS = (100, 100)  # Pozycja siatki
GRID_SIZE = 600      # Wymiary siatki
CELL_SIZE = 200

# Zmienne gry
current_player = "O"  # 'O' lub 'X'
board = [["" for _ in range(3)] for _ in range(3)]  # Tablica 3x3 do śledzenia stanu gry

# Ładowanie grafik
GRID = pygame.image.load(os.path.join('tic_tac_toe_graphics', 'grid.png'))
CIRCLE = pygame.image.load(os.path.join('tic_tac_toe_graphics', 'circle.png'))
CROSS = pygame.image.load(os.path.join('tic_tac_toe_graphics', 'x.png'))

def draw_window():
    WIN.fill((255, 255, 255))  # Białe tło
    WIN.blit(GRID, (40, 40))

    # Rysowanie kółek i krzyżyków
    for y in range(3):
        for x in range(3):
            if board[y][x] == "O":
                WIN.blit(CIRCLE, (GRID_POS[0] + x * CELL_SIZE, GRID_POS[1] + y * CELL_SIZE))
            elif board[y][x] == "X":
                WIN.blit(CROSS, (GRID_POS[0] + x * CELL_SIZE, GRID_POS[1] + y * CELL_SIZE))

    # Wyświetlanie, czyja jest kolejka
    font = pygame.font.SysFont(None, 40)
    text = font.render(f"Kolejka gracza: {current_player}", True, (0, 0, 0))
    WIN.blit(text, (20, HEIGHT - 60))

    pygame.display.update()

def handle_mouse_click(pos):
    global current_player
    x, y = pos
    grid_x, grid_y = GRID_POS
    if grid_x < x < grid_x + GRID_SIZE and grid_y < y < grid_y + GRID_SIZE:
        cell_x = (x - grid_x) // CELL_SIZE
        cell_y = (y - grid_y) // CELL_SIZE
        if board[cell_y][cell_x] == "":
            board[cell_y][cell_x] = current_player
            current_player = "X" if current_player == "O" else "O"

def check_winner(board, player):
    # Sprawdzenie wierszy
    for row in board:
        if all(cell == player for cell in row):
            return True

    # Sprawdzenie kolumn
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True

    # Sprawdzenie przekątnych
    if all(board[i][i] == player for i in range(3)):
        return True
    if all(board[i][2 - i] == player for i in range(3)):
        return True

    return False

def check_draw(board):
    return all(cell != "" for row in board for cell in row)

def check_game_over(board, player):
    if check_winner(board, player):
        return f"Gracz {player} wygrywa!"
    elif check_draw(board):
        return "Remis!"
    return None

def reset_game():
    global board, current_player
    board = [["" for _ in range(3)] for _ in range(3)]
    current_player = "O"

def display_game_over(message):
    font = pygame.font.SysFont(None, 60)
    text = font.render(message, True, (255, 255, 255))
    retry_text = font.render("Kliknij, aby zagrać ponownie", True, (255, 255, 255))

    # Wyznaczanie rozmiaru tła
    text_width = max(text.get_width(), retry_text.get_width()) + 20
    text_height = text.get_height() + retry_text.get_height() + 60
    text_x = WIDTH // 2 - text_width // 2
    text_y = HEIGHT // 2 - text_height // 2

    # Rysowanie tła
    text_background = pygame.Rect(text_x, text_y, text_width, text_height)
    pygame.draw.rect(WIN, (0, 0, 0, .5), text_background)

    # Wyświetlanie tekstu
    WIN.blit(text, (WIDTH // 2 - text.get_width() // 2, HEIGHT // 2 - text.get_height() // 2 - 20))
    WIN.blit(retry_text, (WIDTH // 2 - retry_text.get_width() // 2, HEIGHT // 2 + text.get_height() // 2 - 10))

    pygame.display.update()

def main():
    run = True
    clock = pygame.time.Clock()
    game_over_message = None

    while run:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                if game_over_message:
                    # Restart gry po zakończeniu
                    reset_game()
                    game_over_message = None
                else:
                    # Obsługa ruchu w grze
                    handle_mouse_click(pygame.mouse.get_pos())
                    game_over_message = check_game_over(board, "X" if current_player == "O" else "O")

        draw_window()
        if game_over_message:
            display_game_over(game_over_message)

    pygame.quit()

if __name__ == "__main__":
    main()
