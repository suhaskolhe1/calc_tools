document.addEventListener('DOMContentLoaded', () => {
    const tabs = {
        length: document.getElementById('tab-length'),
        weight: document.getElementById('tab-weight'),
        temp: document.getElementById('tab-temp')
    };

    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    const inputValue = document.getElementById('input-value');
    const outputValue = document.getElementById('output-value');

    const units = {
        length: ['Meters', 'Kilometers', 'Feet', 'Inches', 'Miles'],
        weight: ['Kilograms', 'Grams', 'Pounds', 'Ounces'],
        temp: ['Celsius', 'Fahrenheit', 'Kelvin']
    };

    let currentCategory = 'length';

    function setCategory(category) {
        currentCategory = category;

        // Update tabs styling
        Object.keys(tabs).forEach(key => {
            if (key === category) {
                tabs[key].classList.add('bg-white', 'text-indigo-600', 'shadow-sm');
                tabs[key].classList.remove('text-slate-500');
            } else {
                tabs[key].classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
                tabs[key].classList.add('text-slate-500');
            }
        });

        // Populate selects
        const options = units[category].map(u => `<option value="${u}">${u}</option>`).join('');
        inputUnit.innerHTML = options;
        outputUnit.innerHTML = options;

        // Set default different units
        outputUnit.selectedIndex = 1;

        convert();
    }

    // Event Listeners
    tabs.length.addEventListener('click', () => setCategory('length'));
    tabs.weight.addEventListener('click', () => setCategory('weight'));
    tabs.temp.addEventListener('click', () => setCategory('temp'));

    inputValue.addEventListener('input', convert);
    inputUnit.addEventListener('change', convert);
    outputUnit.addEventListener('change', convert);

    function convert() {
        const value = parseFloat(inputValue.value);
        if (isNaN(value)) {
            outputValue.value = '';
            return;
        }

        const from = inputUnit.value;
        const to = outputUnit.value;
        let result = 0;

        if (from === to) {
            result = value;
        } else if (currentCategory === 'length') {
            result = convertLength(value, from, to);
        } else if (currentCategory === 'weight') {
            result = convertWeight(value, from, to);
        } else if (currentCategory === 'temp') {
            result = convertTemp(value, from, to);
        }

        outputValue.value = Number.isInteger(result) ? result : result.toFixed(4).replace(/\.?0+$/, '');
    }

    function convertLength(val, from, to) {
        // Convert to meters first
        let meters = 0;
        switch (from) {
            case 'Meters': meters = val; break;
            case 'Kilometers': meters = val * 1000; break;
            case 'Feet': meters = val / 3.28084; break;
            case 'Inches': meters = val / 39.3701; break;
            case 'Miles': meters = val * 1609.34; break;
        }

        // Convert from meters to target
        switch (to) {
            case 'Meters': return meters;
            case 'Kilometers': return meters / 1000;
            case 'Feet': return meters * 3.28084;
            case 'Inches': return meters * 39.3701;
            case 'Miles': return meters / 1609.34;
        }
    }

    function convertWeight(val, from, to) {
        // Convert to kg first
        let kg = 0;
        switch (from) {
            case 'Kilograms': kg = val; break;
            case 'Grams': kg = val / 1000; break;
            case 'Pounds': kg = val / 2.20462; break;
            case 'Ounces': kg = val / 35.274; break;
        }

        // Convert from kg to target
        switch (to) {
            case 'Kilograms': return kg;
            case 'Grams': return kg * 1000;
            case 'Pounds': return kg * 2.20462;
            case 'Ounces': return kg * 35.274;
        }
    }

    function convertTemp(val, from, to) {
        if (from === 'Celsius') {
            if (to === 'Fahrenheit') return (val * 9 / 5) + 32;
            if (to === 'Kelvin') return val + 273.15;
        } else if (from === 'Fahrenheit') {
            if (to === 'Celsius') return (val - 32) * 5 / 9;
            if (to === 'Kelvin') return (val - 32) * 5 / 9 + 273.15;
        } else if (from === 'Kelvin') {
            if (to === 'Celsius') return val - 273.15;
            if (to === 'Fahrenheit') return (val - 273.15) * 9 / 5 + 32;
        }
        return val;
    }

    // Initialize
    setCategory('length');
});
