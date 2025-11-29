document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const bmiValueSpan = document.getElementById('bmi-value');
    const bmiCategorySpan = document.getElementById('bmi-category');
    const errorMsg = document.getElementById('error-msg');

    calculateBtn.addEventListener('click', calculateBMI);

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const heightCm = parseFloat(heightInput.value);

        if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
            showError(true);
            return;
        }

        showError(false);

        const heightM = heightCm / 100;
        const bmi = weight / (heightM * heightM);
        const bmiRounded = bmi.toFixed(1);

        bmiValueSpan.textContent = bmiRounded;

        let category = '';
        let colorClass = '';
        let bgClass = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            colorClass = 'text-blue-800';
            bgClass = 'bg-blue-200';
        } else if (bmi < 25) {
            category = 'Normal weight';
            colorClass = 'text-green-800';
            bgClass = 'bg-green-200';
        } else if (bmi < 30) {
            category = 'Overweight';
            colorClass = 'text-yellow-800';
            bgClass = 'bg-yellow-200';
        } else {
            category = 'Obesity';
            colorClass = 'text-red-800';
            bgClass = 'bg-red-200';
        }

        bmiCategorySpan.textContent = category;
        bmiCategorySpan.className = `inline-block px-3 py-1 rounded-full text-sm font-semibold ${bgClass} ${colorClass}`;

        resultDiv.classList.remove('hidden');
    }

    function showError(show) {
        if (show) {
            errorMsg.classList.remove('hidden');
            resultDiv.classList.add('hidden');
        } else {
            errorMsg.classList.add('hidden');
        }
    }
});
