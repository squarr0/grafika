Struktura Plików
Zadanie 1: Implementacja i Wizualizacja L-systemów
Pliki:

l-systems.js: Główny skrypt zawierający logikę generowania L-systemów oraz funkcje odpowiedzialne za ich wizualizację przy użyciu grafiki żółwia.
turtle.js: Skrypt implementujący klasę Turtle, która jest wykorzystywana do rysowania na elemencie canvas w HTML. Zawiera metody takie jak forward, turn, penUp, penDown, które umożliwiają żółwiowi rysowanie zgodnie z instrukcjami z L-systemów.
l-system.html: Plik HTML zapewniający interfejs użytkownika do wyboru różnych L-systemów i parametrów, takich jak ilość iteracji. Zawiera element canvas, na którym rysowane są fraktale, oraz przyciski i inne elementy sterujące.

Zadanie 2: Rysowanie Elipsy
Pliki:

elipsa.html: Strona HTML zawierająca elementy canvas, na którym rysowane są elipsy.
drawEllipse.js: Skrypt JavaScript, który implementuje algorytm Bresenhama oraz algorytm naiwny do rysowania elipsy. Zawiera również kod do pomiaru i porównania czasu wykonania obu algorytmów.

Zadanie 3: Gra w Kółko i Krzyżyk
Pliki:

tictactoe.html: Strona HTML zawierająca element canvas, na którym odbywa się gra.
tictactoe.js: Skrypt JavaScript zawierający logikę gry w kółko i krzyżyk.

Zadanie 4: Gra "Memory"
Pliki:

memory.html: Strona HTML zawierająca element canvas dla gry "Memory".
memory.js: Skrypt JavaScript zawierający logikę gry "Memory".
W folderze memory_graphics:
	card_back.png: Grafika tyłu karty.
	card_{i}.png: Obrazki kart dla i od 0 do 9.


Instrukcje Użytkownika
Gra w Kółko i Krzyżyk
Otwórz plik index.html w przeglądarce, aby rozpocząć grę.
Grać można klikając myszką w odpowiednie pola na planszy.
Gra Memory
Otwórz plik memory.html w przeglądarce.
Grać można klikając myszką w karty, aby je odkrywać i znajdować pary.
Punkty są naliczane za każdą odnalezioną parę kart.