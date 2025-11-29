document.addEventListener('DOMContentLoaded', () => {
    const investmentInput = document.getElementById('investment');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const totalValueSpan = document.getElementById('total-value');
    const investedAmountSpan = document.getElementById('invested-amount');
    const estReturnsSpan = document.getElementById('est-returns');

    calculateBtn.addEventListener('click', calculateSIP);

    function calculateSIP() {
        const P = parseFloat(investmentInput.value);
        const i = parseFloat(rateInput.value) / 12 / 100;
        const n = parseFloat(yearsInput.value) * 12;

        if (isNaN(P) || isNaN(i) || isNaN(n) || P <= 0 || i < 0 || n <= 0) {
            return;
        }

        const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const invested = P * n;
        const returns = M - invested;

        totalValueSpan.textContent = Math.round(M).toLocaleString();
        investedAmountSpan.textContent = Math.round(invested).toLocaleString();
        estReturnsSpan.textContent = Math.round(returns).toLocaleString();

        resultDiv.classList.remove('hidden');
    }
});
