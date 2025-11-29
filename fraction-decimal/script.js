document.addEventListener('DOMContentLoaded', () => {
    const numeratorInput = document.getElementById('numerator');
    const denominatorInput = document.getElementById('denominator');
    const calculateBtn = document.getElementById('calculate-btn');
    const decimalOutput = document.getElementById('decimal-output');

    calculateBtn.addEventListener('click', convert);

    function convert() {
        const num = parseFloat(numeratorInput.value);
        const den = parseFloat(denominatorInput.value);

        if (isNaN(num) || isNaN(den)) {
            return;
        }

        if (den === 0) {
            decimalOutput.value = 'Undefined';
            return;
        }

        const result = num / den;
        decimalOutput.value = Number.isInteger(result) ? result : result.toFixed(4).replace(/\.?0+$/, '');
    }
});
