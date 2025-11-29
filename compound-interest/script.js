document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const frequencyInput = document.getElementById('frequency');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const futureVal = document.getElementById('future-val');
    const interestVal = document.getElementById('interest-val');

    calculateBtn.addEventListener('click', calculateCI);

    function calculateCI() {
        const P = parseFloat(principalInput.value);
        const r = parseFloat(rateInput.value) / 100;
        const t = parseFloat(timeInput.value);
        const n = parseFloat(frequencyInput.value);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) {
            return;
        }

        const A = P * Math.pow((1 + r / n), (n * t));
        const interest = A - P;

        futureVal.textContent = Math.round(A).toLocaleString();
        interestVal.textContent = Math.round(interest).toLocaleString();

        resultDiv.classList.remove('hidden');
    }
});
