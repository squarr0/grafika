import matplotlib.pyplot as plt
import time
import math

def plot_ellipse_naive(rx, ry, xc, yc, ax):
    points = []
    for x in range(-rx, rx):
        y = ry * math.sqrt(1 - (x/rx)**2)
        points.append((x + xc, y + yc))
        points.append((x + xc, -y + yc))

    for point in points:
        ax.plot(point[0], point[1], 'ro')

def plot_ellipse_bresenham(rx, ry, xc, yc, ax):
    x = 0
    y = ry

    d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx)
    dx = 2 * ry * ry * x
    dy = 2 * rx * rx * y

    while dx < dy:
        ax.plot(x + xc, y + yc, 'ro')
        ax.plot(-x + xc, y + yc, 'ro')
        ax.plot(x + xc, -y + yc, 'ro')
        ax.plot(-x + xc, -y + yc, 'ro')

        if d1 < 0:
            x += 1
            dx = dx + (2 * ry * ry)
            d1 = d1 + dx + (ry * ry)
        else:
            x += 1
            y -= 1
            dx = dx + (2 * ry * ry)
            dy = dy - (2 * rx * rx)
            d1 = d1 + dx - dy + (ry * ry)

    d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) + ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry)

    while y >= 0:
        ax.plot(x + xc, y + yc, 'ro')
        ax.plot(-x + xc, y + yc, 'ro')
        ax.plot(x + xc, -y + yc, 'ro')
        ax.plot(-x + xc, -y + yc, 'ro')

        if d2 > 0:
            y -= 1
            dy = dy - (2 * rx * rx)
            d2 = d2 + (rx * rx) - dy
        else:
            y -= 1
            x += 1
            dx = dx + (2 * ry * ry)
            d2 = d2 + dx - dy + (rx * rx)

def draw_and_compare(rx, ry, xc, yc):
    fig, (ax1, ax2) = plt.subplots(1, 2)
    
    start_naive = time.time()
    plot_ellipse_naive(rx, ry, xc, yc, ax1)
    end_naive = time.time()
    
    start_bresenham = time.time()
    plot_ellipse_bresenham(rx, ry, xc, yc, ax2)
    end_bresenham = time.time()

    print(f"Czas wykonania algorytmu naiwnego: {end_naive - start_naive} sekund")
    print(f"Czas wykonania algorytmu Bresenhama: {end_bresenham - start_bresenham} sekund")
    
    ax1.set_title("Algorytm Naiwny")
    ax2.set_title("Algorytm Bresenhama")
    plt.show()

draw_and_compare(100, 50, 0, 0)