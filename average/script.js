document.addEventListener('DOMContentLoaded', () => {
    const numbersInput = document.getElementById('numbers');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const averageVal = document.getElementById('average-val');
    const sumVal = document.getElementById('sum-val');
    const countVal = document.getElementById('count-val');

    calculateBtn.addEventListener('click', calculateAverage);

    function calculateAverage() {
        const input = numbersInput.value;
        if (!input.trim()) return;

        // Split by comma, space, or newline and filter empty strings
        const numbers = input.split(/[\s,]+/).filter(n => n !== '').map(Number);

        // Filter out NaNs
        const validNumbers = numbers.filter(n => !isNaN(n));

        if (validNumbers.length === 0) return;

        const sum = validNumbers.reduce((a, b) => a + b, 0);
        const count = validNumbers.length;
        const average = sum / count;

        averageVal.textContent = Number.isInteger(average) ? average : average.toFixed(4).replace(/\.?0+$/, '');
        sumVal.textContent = sum;
        countVal.textContent = count;

        resultDiv.classList.remove('hidden');
    }
});
