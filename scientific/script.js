document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id === 'calculate') {
                calculate();
            } else if (btn.dataset.val) {
                append(btn.dataset.val);
            } else if (btn.dataset.func) {
                handleFunc(btn.dataset.func);
            }
        });
    });

    function append(val) {
        if (display.value === 'Error') display.value = '';
        display.value += val;
    }

    function handleFunc(func) {
        if (display.value === 'Error') display.value = '';

        switch (func) {
            case 'clear':
                display.value = '';
                break;
            case 'backspace':
                display.value = display.value.slice(0, -1);
                break;
            case 'sin':
                display.value += 'sin(';
                break;
            case 'cos':
                display.value += 'cos(';
                break;
            case 'tan':
                display.value += 'tan(';
                break;
            case 'sqrt':
                display.value += 'sqrt(';
                break;
        }
    }

    function calculate() {
        let expression = display.value;

        // Replace math functions with JS equivalents
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');

        try {
            // Note: eval is used here for simplicity in this static calculator context.
            // In a production app with user data storage, a parser would be safer.
            const result = eval(expression);

            if (!isFinite(result) || isNaN(result)) {
                display.value = 'Error';
            } else {
                display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
            }
        } catch (e) {
            display.value = 'Error';
        }
    }
});
