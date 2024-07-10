// convertToSubCurrency.ts
function convertToSubCurrency(amount: string, factor = 100) {
    const numericAmount = parseFloat(amount);
    return Math.round(numericAmount * factor);
}

export default convertToSubCurrency;
