document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('password-display');
    const lengthSlider = document.getElementById('length');
    const lengthVal = document.getElementById('length-val');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    lengthSlider.addEventListener('input', () => {
        lengthVal.textContent = lengthSlider.value;
    });

    generateBtn.addEventListener('click', generatePassword);

    copyBtn.addEventListener('click', () => {
        if (display.textContent === 'Click Generate') return;

        navigator.clipboard.writeText(display.textContent).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span class="text-green-600 text-xs font-bold">Copied!</span>';
            setTimeout(() => {
                copyBtn.innerHTML = original;
            }, 1500);
        });
    });

    function generatePassword() {
        let chars = '';
        if (uppercaseEl.checked) chars += upper;
        if (lowercaseEl.checked) chars += lower;
        if (numbersEl.checked) chars += nums;
        if (symbolsEl.checked) chars += syms;

        if (chars === '') {
            display.textContent = 'Select at least one option';
            return;
        }

        let password = '';
        const length = parseInt(lengthSlider.value);

        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        display.textContent = password;
    }

    // Generate one on load
    generatePassword();
});
