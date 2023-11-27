Struktura Plików
Zadanie 1: Implementacja i Wizualizacja L-systemów
Pliki:

l-systems.js: Główny skrypt zawierający logikę generowania L-systemów oraz funkcje odpowiedzialne za ich wizualizację przy użyciu grafiki żółwia.
turtle.js: Skrypt implementujący klasę Turtle, która jest wykorzystywana do rysowania na elemencie canvas w HTML. Zawiera metody takie jak forward, turn, penUp, penDown, które umożliwiają żółwiowi rysowanie zgodnie z instrukcjami z L-systemów.
l-system.html: Plik HTML zapewniający interfejs użytkownika do wyboru różnych L-systemów i parametrów, takich jak ilość iteracji. Zawiera element canvas, na którym rysowane są fraktale, oraz przyciski i inne elementy sterujące.

Zadanie 2: Rysowanie Elipsy w Pythonie
Pliki:

elipsa.py: Skrypt Pythona, który implementuje algorytm Bresenhama oraz algorytm naiwny do rysowania elipsy. Zawiera również kod do pomiaru i porównania czasu wykonania obu algorytmów.

Zadanie 3: Gra w Kółko i Krzyżyk w Pygame
Pliki:

tic_tac_toe.py: Główny skrypt gry w kółko i krzyżyk.
W folderze tic_tac_toe_graphics:
	grid.png: Grafika siatki gry o wymiarach 720x720 pikseli (3 kratki o rozmiarze 200x200 każda plus dodatkowe miejsce).
	circle.png: Grafika kółka.
	x.png: Grafika krzyżyka.

Zadanie 4: Gra "Memory"
Pliki:

memory.py: Skrypt Pythona z grą "Memory", gdzie gracze odwracają karty, próbując znaleźć pary. Plansza składa się z 20 kart (10 par) rozmieszczonych w układzie 5x4.
W folderze memory_graphics:
	card_back.png: Grafika tyłu karty.
	card_{i}.png: Obrazki kart dla i od 0 do 9.