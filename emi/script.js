document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const tenureInput = document.getElementById('tenure');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const emiVal = document.getElementById('emi-val');
    const totalInterestVal = document.getElementById('total-interest');
    const totalAmountVal = document.getElementById('total-amount');

    calculateBtn.addEventListener('click', calculateEMI);

    function calculateEMI() {
        const P = parseFloat(amountInput.value);
        const R = parseFloat(rateInput.value) / 12 / 100;
        const N = parseFloat(tenureInput.value) * 12;

        if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R < 0 || N <= 0) {
            return;
        }

        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalAmount = emi * N;
        const totalInterest = totalAmount - P;

        emiVal.textContent = Math.round(emi).toLocaleString();
        totalInterestVal.textContent = Math.round(totalInterest).toLocaleString();
        totalAmountVal.textContent = Math.round(totalAmount).toLocaleString();

        resultDiv.classList.remove('hidden');
    }
});
