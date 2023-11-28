function generateLSystemString(axiom, rules, iterations) {
    let currentString = axiom;

    for (let i = 0; i < iterations; i++) {
        let newString = '';
        for (const char of currentString) {
            newString += rules[char] || char;
        }
        currentString = newString;
    }

    return currentString;
}

function drawAlgae(string, turtle, distance, angle) {
    for (const char of string) {
        if (char === 'A') {
            turtle.forward(distance);
        } else if (char === 'B') {
            turtle.turn(angle);
        }
    }
}

function drawKochCurve(string, turtle, distance, angle) {
    for (const char of string) {
        if (char === 'F') {
            turtle.forward(distance)
        }
        if (char === '-') {
            turtle.turn(-angle)
        }
        if (char === '+') {
            turtle.turn(angle)
        }
    }
}

function drawCantorSet(string, turtle, distance, angle) {
    for (const char of string) {
        if (char === 'A') {
            turtle.penDown()
            turtle.forward(distance)
        }
        if (char === 'B') {
            turtle.penUp()
            turtle.forward(distance)
        }
    }
}

function drawSelectedFractal() {
    const canvas = document.getElementById('turtleCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyści płótno przed rysowaniem

    const fractalType = document.getElementById('fractalSelect').value;
    const iterations = parseInt(document.getElementById('iterations').value);

    const turtle = new Turtle(400, 300, 0, ctx);
    turtle.penDown()

    let axiom, rules;
    if (fractalType === 'algae') {
        axiom = 'A';
        rules = {'A': 'AB', 'B': 'A'};
    } else if (fractalType === 'kochCurve') {
        axiom = 'F';
        rules = {'F': 'F-F++F-F'};
    } else if (fractalType === 'cantorSet') {
        axiom = 'A';
        rules = {'A': 'ABA', 'B': 'BBB'};
    }

    const resultString = generateLSystemString(axiom, rules, iterations);
    if (fractalType === 'algae') {    
        drawAlgae(resultString, turtle, 60, 60);
    } else if (fractalType === 'kochCurve') {        
        drawKochCurve(resultString, turtle, 2, 60);
    } else if (fractalType === 'cantorSet') {        
        drawCantorSet(resultString, turtle, 1, 60);
    }
}