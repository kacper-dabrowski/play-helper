const { default: generateOpenedDoubleTemplate } = require('./openedDouble');

it('should generate a valid doubleClosed template', () => {
    expect(generateOpenedDoubleTemplate('MAN', '123', '456'))
        .toEqual(`Dziękujemy za zgłoszenie 123 Poruszane przez Pana kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie 456.

Z poważaniem, 
Obsługa Klienta Play`);
});

it('should throw an error if no number of current is provided', () => {
    expect(() => generateOpenedDoubleTemplate('', '456')).toThrow();
});

it('should throw an error if no number of closed is provided', () => {
    expect(() => generateOpenedDoubleTemplate('123', '')).toThrow();
});
