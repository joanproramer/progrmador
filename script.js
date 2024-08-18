let clearIntervalId = null;

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById('display').value;
        // Reemplaza las funciones matemáticas con su implementación en JavaScript
        expression = expression.replace(/Math.sin\(([^)]+)\)/g, 'Math.sin($1)');
        expression = expression.replace(/Math.cos\(([^)]+)\)/g, 'Math.cos($1)');
        expression = expression.replace(/Math.tan\(([^)]+)\)/g, 'Math.tan($1)');
        expression = expression.replace(/Math.log\(([^)]+)\)/g, 'Math.log10($1)');
        expression = expression.replace(/Math.exp\(([^)]+)\)/g, 'Math.exp($1)');
        expression = expression.replace(/Math.PI/g, 'Math.PI');
        expression = expression.replace(/Math.E/g, 'Math.E');
        // Evaluar la expresión con eval
        document.getElementById('display').value = eval(expression);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function calculateSquareRoot() {
    try {
        let value = parseFloat(document.getElementById('display').value);
        if (isNaN(value)) throw 'Error';
        document.getElementById('display').value = Math.sqrt(value);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function calculatePower() {
    let expression = document.getElementById('display').value;
    if (!expression.includes('^')) return;
    let [base, exponent] = expression.split('^').map(Number);
    if (isNaN(base) || isNaN(exponent)) {
        document.getElementById('display').value = 'Error';
        return;
    }
    document.getElementById('display').value = Math.pow(base, exponent);
}

function calculateLog() {
    try {
        let value = parseFloat(document.getElementById('display').value);
        if (isNaN(value)) throw 'Error';
        document.getElementById('display').value = Math.log10(value);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function calculateExp() {
    try {
        let value = parseFloat(document.getElementById('display').value);
        if (isNaN(value)) throw 'Error';
        document.getElementById('display').value = Math.exp(value);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function calculateFactorial() {
    try {
        let value = parseInt(document.getElementById('display').value, 10);
        if (isNaN(value) || value < 0) throw 'Error';
        let result = 1;
        for (let i = 1; i <= value; i++) {
            result *= i;
        }
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function startClear() {
    clearIntervalId = setInterval(clearDisplay, 100); // Borra cada 100ms mientras se mantiene presionado
}

function stopClear() {
    clearInterval(clearIntervalId);
    clearIntervalId = null;
}
1