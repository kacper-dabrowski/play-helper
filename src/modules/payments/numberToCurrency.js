const replaceDotWithComma = (stringWithDot) => stringWithDot.replace(/\./, ',');

const numberToCurrency = (amount, currency = 'zł') => {
    const amountAsString = amount.toFixed(2);

    return `${replaceDotWithComma(amountAsString)}${currency}`;
};

export default numberToCurrency;
