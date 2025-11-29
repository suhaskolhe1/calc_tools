document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('income');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const taxVal = document.getElementById('tax-val');
    const rateVal = document.getElementById('rate-val');

    calculateBtn.addEventListener('click', calculateTax);

    function calculateTax() {
        const income = parseFloat(incomeInput.value);

        if (isNaN(income) || income < 0) return;

        let tax = 0;

        // Simplified New Regime Slabs (Example)
        if (income > 1500000) {
            tax += (income - 1500000) * 0.30;
            tax += 150000; // Tax for 12-15L (3L * 20% = 60k? Wait. Let's do standard slab math)
            // 0-3: 0
            // 3-6: 5% of 3L = 15000
            // 6-9: 10% of 3L = 30000
            // 9-12: 15% of 3L = 45000
            // 12-15: 20% of 3L = 60000
            // Total up to 15L = 15000 + 30000 + 45000 + 60000 = 150000
        } else if (income > 1200000) {
            tax += (income - 1200000) * 0.20;
            tax += 90000;
        } else if (income > 900000) {
            tax += (income - 900000) * 0.15;
            tax += 45000;
        } else if (income > 600000) {
            tax += (income - 600000) * 0.10;
            tax += 15000;
        } else if (income > 300000) {
            tax += (income - 300000) * 0.05;
        }

        // Rebate u/s 87A (Example: No tax if income <= 7L in new regime)
        if (income <= 700000) {
            tax = 0;
        }

        const effectiveRate = (tax / income) * 100;

        taxVal.textContent = Math.round(tax).toLocaleString();
        rateVal.textContent = income > 0 ? effectiveRate.toFixed(2) + '%' : '0%';

        resultDiv.classList.remove('hidden');
    }
});
