// Lista de acertijos y pistas
const riddles = [
    {
        question: "Tengo agujas pero no pincho. ¿Qué soy?",
        answer: "reloj",
        hint: "Es un objeto que usas para saber la hora y suele estar en tu muñeca."
    },
    {
        question: "No puedo hablar, pero siempre te respondo. ¿Qué soy?",
        answer: "eco",
        hint: "Se produce cuando hablas en un lugar grande y vacío, como una montaña o un cañón."
    },
    {
        question: "Cuanto más quito, más grande se vuelve. ¿Qué es?",
        answer: "agujero",
        hint: "Es una abertura que puede encontrarse en objetos como una pared, un balde, o en la tierra."
    }
];

let currentRiddleIndex = 0;
let lives = 3;
let solvedCount = 0;

// Mostrar el acertijo actual
function showRiddle() {
    const riddle = riddles[currentRiddleIndex];
    document.getElementById('riddle-text').textContent = riddle.question;
    document.getElementById('hint').classList.add('hidden');
    document.getElementById('riddle-result').textContent = '';
}

// Verificar la respuesta del usuario
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.toLowerCase();
    const riddle = riddles[currentRiddleIndex];
    const result = document.getElementById('riddle-result');

    if (userAnswer === riddle.answer) {
        result.textContent = "¡Correcto! Has resuelto el acertijo.";
        solvedCount++;
        document.getElementById('solved-count-value').textContent = solvedCount;
        currentRiddleIndex++;
        if (currentRiddleIndex < riddles.length) {
            setTimeout(showRiddle, 2000); // Mostrar el siguiente acertijo después de 2 segundos
        } else {
            result.textContent += " ¡Has completado todos los acertijos!";
        }
    } else {
        lives--;
        document.getElementById('lives-count').textContent = lives;
        if (lives <= 0) {
            result.textContent = "¡Te has quedado sin vidas! Fin del juego.";
            document.getElementById('hint').classList.add('hidden');
            document.getElementById('answer-input').disabled = true;
            document.querySelector('button').disabled = true;
        } else {
            result.textContent = "Incorrecto. Inténtalo de nuevo.";
            document.getElementById('hint').classList.remove('hidden');
            document.getElementById('hint').textContent = riddles[currentRiddleIndex].hint;
        }
    }
}

// Inicializar el juego
window.onload = showRiddle;
