document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const resultVal = document.getElementById('result-val');
    const rateInfo = document.getElementById('rate-info');

    // Fallback rates
    const rates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        INR: 83.50,
        JPY: 155.0,
        AUD: 1.52,
        CAD: 1.37
    };

    calculateBtn.addEventListener('click', convertCurrency);

    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        if (isNaN(amount) || amount <= 0) return;

        // Try to fetch live rates, fallback to static
        let rate = 0;
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            const data = await response.json();
            rate = data.rates[to];
        } catch (e) {
            // Fallback calculation
            const fromRateUSD = rates[from]; // Rate of From to USD (inverse of USD to From) -> Wait, rates are USD base.
            // rates[USD] = 1. rates[EUR] = 0.92 means 1 USD = 0.92 EUR.
            // To convert From -> To: Amount / rates[From] * rates[To]
            rate = (1 / rates[from]) * rates[to];
        }

        const result = amount * rate;

        resultVal.textContent = result.toFixed(2) + ' ' + to;
        rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

        resultDiv.classList.remove('hidden');
    }
});
