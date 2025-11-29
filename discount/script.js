document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('price');
    const discountInput = document.getElementById('discount');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const finalPriceSpan = document.getElementById('final-price');
    const savedAmountSpan = document.getElementById('saved-amount');

    calculateBtn.addEventListener('click', calculateDiscount);

    function calculateDiscount() {
        const price = parseFloat(priceInput.value);
        const discount = parseFloat(discountInput.value);

        if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0) {
            return;
        }

        const savings = (price * discount) / 100;
        const finalPrice = price - savings;

        finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);
        savedAmountSpan.textContent = '$' + savings.toFixed(2);

        resultDiv.classList.remove('hidden');
    }
});
