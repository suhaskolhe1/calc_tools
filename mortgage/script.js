document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const monthlyVal = document.getElementById('monthly-val');
    const totalVal = document.getElementById('total-val');

    calculateBtn.addEventListener('click', calculateMortgage);

    function calculateMortgage() {
        const P = parseFloat(amountInput.value);
        const r = parseFloat(rateInput.value) / 100 / 12;
        const n = parseFloat(yearsInput.value) * 12;

        if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) return;

        // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = M * n;

        monthlyVal.textContent = Math.round(M).toLocaleString();
        totalVal.textContent = Math.round(total).toLocaleString();

        resultDiv.classList.remove('hidden');
    }
});
