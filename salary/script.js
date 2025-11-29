document.addEventListener('DOMContentLoaded', () => {
    const ctcInput = document.getElementById('ctc');
    const bonusInput = document.getElementById('bonus');
    const deductionsInput = document.getElementById('deductions');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const monthlyVal = document.getElementById('monthly-val');
    const annualVal = document.getElementById('annual-val');

    calculateBtn.addEventListener('click', calculateSalary);

    function calculateSalary() {
        const ctc = parseFloat(ctcInput.value) || 0;
        const bonus = parseFloat(bonusInput.value) || 0;
        const monthlyDeductions = parseFloat(deductionsInput.value) || 0;

        if (ctc <= 0) return;

        const fixedAnnual = ctc - bonus;
        const annualDeductions = monthlyDeductions * 12;
        const annualInHand = fixedAnnual - annualDeductions;
        const monthlyInHand = annualInHand / 12;

        monthlyVal.textContent = Math.round(monthlyInHand).toLocaleString();
        annualVal.textContent = Math.round(annualInHand).toLocaleString();

        resultDiv.classList.remove('hidden');
    }
});
