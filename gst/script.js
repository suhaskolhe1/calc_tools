document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const totalVal = document.getElementById('total-val');
    const netVal = document.getElementById('net-val');
    const gstVal = document.getElementById('gst-val');

    const typeExclusive = document.getElementById('type-exclusive');
    const typeInclusive = document.getElementById('type-inclusive');

    let isExclusive = true;

    typeExclusive.addEventListener('click', () => {
        isExclusive = true;
        updateTypeUI();
    });

    typeInclusive.addEventListener('click', () => {
        isExclusive = false;
        updateTypeUI();
    });

    function updateTypeUI() {
        if (isExclusive) {
            typeExclusive.classList.add('bg-white', 'text-indigo-600', 'shadow-sm');
            typeExclusive.classList.remove('text-slate-500');
            typeInclusive.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
            typeInclusive.classList.add('text-slate-500');
        } else {
            typeInclusive.classList.add('bg-white', 'text-indigo-600', 'shadow-sm');
            typeInclusive.classList.remove('text-slate-500');
            typeExclusive.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
            typeExclusive.classList.add('text-slate-500');
        }
    }

    calculateBtn.addEventListener('click', calculateGST);

    function calculateGST() {
        const amount = parseFloat(amountInput.value);
        const rate = parseFloat(rateInput.value);

        if (isNaN(amount) || isNaN(rate)) return;

        let gstAmount = 0;
        let netAmount = 0;
        let totalAmount = 0;

        if (isExclusive) {
            gstAmount = (amount * rate) / 100;
            netAmount = amount;
            totalAmount = amount + gstAmount;
        } else {
            gstAmount = amount - (amount * (100 / (100 + rate)));
            netAmount = amount - gstAmount;
            totalAmount = amount;
        }

        totalVal.textContent = totalAmount.toFixed(2);
        netVal.textContent = netAmount.toFixed(2);
        gstVal.textContent = gstAmount.toFixed(2);

        resultDiv.classList.remove('hidden');
    }
});
