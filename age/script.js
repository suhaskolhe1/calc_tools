document.addEventListener('DOMContentLoaded', () => {
    const dobInput = document.getElementById('dob');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const nextBirthdaySpan = document.getElementById('next-birthday');
    const errorMsg = document.getElementById('error-msg');

    // Set max date to today to prevent future dates
    const today = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', today);

    calculateBtn.addEventListener('click', calculateAge);

    // Allow Enter key to trigger calculation
    dobInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });

    function calculateAge() {
        const dobValue = dobInput.value;
        
        if (!dobValue) {
            showError(true);
            return;
        }

        const dob = new Date(dobValue);
        const today = new Date();

        if (dob > today) {
            showError(true);
            return;
        }

        showError(false);
        
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        // Adjust for negative days (borrow from previous month)
        if (days < 0) {
            months--;
            // Get days in the previous month
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        // Adjust for negative months (borrow from previous year)
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate next birthday
        const currentYear = today.getFullYear();
        let nextBirthday = new Date(dob);
        nextBirthday.setFullYear(currentYear);

        if (nextBirthday < today) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        const diffTime = Math.abs(nextBirthday - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        let nextBirthdayText = "";
        if (diffDays === 0 || (today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth())) {
            nextBirthdayText = "Today! Happy Birthday! 🎉";
        } else {
            nextBirthdayText = `${diffDays} days`;
        }

        // Update UI
        yearsSpan.textContent = years;
        monthsSpan.textContent = months;
        daysSpan.textContent = days;
        nextBirthdaySpan.textContent = nextBirthdayText;

        resultDiv.classList.remove('hidden');
        
        // Simple animation effect
        resultDiv.classList.remove('opacity-0', 'translate-y-4');
        resultDiv.classList.add('transition-all', 'duration-500', 'ease-out');
    }

    function showError(show) {
        if (show) {
            errorMsg.classList.remove('hidden');
            dobInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            dobInput.classList.remove('border-slate-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
            resultDiv.classList.add('hidden');
        } else {
            errorMsg.classList.add('hidden');
            dobInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            dobInput.classList.add('border-slate-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
        }
    }
});
