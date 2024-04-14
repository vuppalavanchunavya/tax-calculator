document.addEventListener('DOMContentLoaded', function() {
    function validateInput(input) {
        // This function checks if the input is a valid number
        const value = parseFloat(input.value);
        const errorIcon = input.nextElementSibling;
        const tooltip = errorIcon.nextElementSibling;

        if (isNaN(value) && input.value !== '') {
            errorIcon.style.visibility = 'visible';
            tooltip.hidden = false;
        } else {
            errorIcon.style.visibility = 'hidden';
            tooltip.hidden = true;
        }
    }

    function calculateTax() {
        const grossIncomeInput = document.getElementById('grossIncome');
        const extraIncomeInput = document.getElementById('extraIncome');
        const deductionsInput = document.getElementById('deductions');
        const ageInput = document.getElementById('age');

        // Validate inputs
        validateInput(grossIncomeInput);
        validateInput(extraIncomeInput);
        validateInput(deductionsInput);

        if (!ageInput.value) {
            const errorIcon = ageInput.nextElementSibling;
            const tooltip = errorIcon.nextElementSibling;
            errorIcon.style.visibility = 'visible';
            tooltip.hidden = false;
            return;  // Stop further execution if age is not selected
        } else {
            const errorIcon = ageInput.nextElementSibling;
            const tooltip = errorIcon.nextElementSibling;
            errorIcon.style.visibility = 'hidden';
            tooltip.hidden = true;
        }

        const grossIncome = parseFloat(grossIncomeInput.value) || 0;
        const extraIncome = parseFloat(extraIncomeInput.value) || 0;
        const deductions = parseFloat(deductionsInput.value) || 0;
        const totalIncome = grossIncome + extraIncome - deductions;

        let tax = 0;
        if (totalIncome > 800000) {
            let taxRate;
            if (ageInput.value === '<40') {
                taxRate = 0.30;
            } else if (ageInput.value === '40-59') {
                taxRate = 0.40;
            } else {
                taxRate = 0.10;
            }

            const taxableIncome = totalIncome - 800000;
            tax = taxableIncome * taxRate;
        }

        const incomeAfterTax = totalIncome - tax;
        showResult(tax, incomeAfterTax);
    }

    function showResult(tax, incomeAfterTax) {
        const modal = document.getElementById('resultModal');
        document.getElementById('taxResult').textContent = `Tax: ₹${tax.toLocaleString()}`;
        document.getElementById('incomeAfterTaxResult').textContent = `Income After Tax: ₹${incomeAfterTax.toLocaleString()}`;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('resultModal');
        modal.style.display = 'none';
    }

    document.querySelector('.btn-close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('resultModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    document.getElementById('taxForm').querySelector('button').addEventListener('click', calculateTax);
});
