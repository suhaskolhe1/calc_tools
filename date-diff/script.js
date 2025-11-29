document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const daysDiffSpan = document.getElementById('days-diff');
    const detailsP = document.getElementById('details');

    calculateBtn.addEventListener('click', calculateDiff);

    function calculateDiff() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return;
        }

        // Calculate absolute difference in milliseconds
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(diffDays / 7);
        const remainingDays = diffDays % 7;

        daysDiffSpan.textContent = diffDays;

        let detailsText = `${weeks} weeks`;
        if (remainingDays > 0) {
            detailsText += ` and ${remainingDays} days`;
        }
        detailsP.textContent = detailsText;

        resultDiv.classList.remove('hidden');
    }
});
