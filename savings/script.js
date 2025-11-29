document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goal');
    const initialInput = document.getElementById('initial');
    const yearsInput = document.getElementById('years');
    const rateInput = document.getElementById('rate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const monthlyVal = document.getElementById('monthly-val');

    calculateBtn.addEventListener('click', calculateSavings);

    function calculateSavings() {
        const goal = parseFloat(goalInput.value);
        const initial = parseFloat(initialInput.value) || 0;
        const years = parseFloat(yearsInput.value);
        const rate = parseFloat(rateInput.value);

        if (isNaN(goal) || isNaN(years) || isNaN(rate) || goal <= 0 || years <= 0) return;

        const r = rate / 100 / 12;
        const n = years * 12;

        // Future Value of Initial Amount: FV_initial = P * (1 + r)^n
        const fvInitial = initial * Math.pow(1 + r, n);

        // Remaining Goal: Goal - FV_initial
        const remainingGoal = goal - fvInitial;

        if (remainingGoal <= 0) {
            monthlyVal.textContent = "0";
            resultDiv.classList.remove('hidden');
            return;
        }

        // PMT = RemainingGoal * r / ((1 + r)^n - 1)
        const pmt = remainingGoal * r / (Math.pow(1 + r, n) - 1);

        monthlyVal.textContent = Math.round(pmt).toLocaleString();

        resultDiv.classList.remove('hidden');
    }
});
