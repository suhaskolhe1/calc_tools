document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const interestVal = document.getElementById('interest-val');
    const totalVal = document.getElementById('total-val');

    calculateBtn.addEventListener('click', calculateSI);

    function calculateSI() {
        const P = parseFloat(principalInput.value);
        const R = parseFloat(rateInput.value);
        const T = parseFloat(timeInput.value);

        if (isNaN(P) || isNaN(R) || isNaN(T)) {
            return;
        }

        const SI = (P * R * T) / 100;
        const total = P + SI;

        interestVal.textContent = SI.toFixed(2);
        totalVal.textContent = total.toFixed(2);

        resultDiv.classList.remove('hidden');
    }
});
