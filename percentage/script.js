document.addEventListener('DOMContentLoaded', () => {
    const percentInput = document.getElementById('percent');
    const numberInput = document.getElementById('number');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const resultValueSpan = document.getElementById('result-value');

    calculateBtn.addEventListener('click', calculatePercentage);

    function calculatePercentage() {
        const percent = parseFloat(percentInput.value);
        const number = parseFloat(numberInput.value);

        if (isNaN(percent) || isNaN(number)) {
            return;
        }

        const result = (percent / 100) * number;

        // Format to avoid long decimals
        const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);

        resultValueSpan.textContent = formattedResult;
        resultDiv.classList.remove('hidden');
    }
});
