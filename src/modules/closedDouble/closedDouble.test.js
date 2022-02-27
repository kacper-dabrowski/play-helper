import { generateClosedDoubleTemplate } from './closedDouble';

describe('modules - closedDouble', () => {
    it('should generate a valid doubleClosed template', () => {
        expect(generateClosedDoubleTemplate('MAN', '123', '456'))
            .toEqual(`Dziękujemy za zgłoszenie 123 Poruszane przez Pana kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie 456.

Z poważaniem, 
Obsługa Klienta Play`);
    });

    it('should throw an error if no number of current is provided', () => {
        expect(() => generateClosedDoubleTemplate('', '456')).toThrow();
    });

    it('should throw an error if no number of closed is provided', () => {
        expect(() => generateClosedDoubleTemplate('123', '')).toThrow();
    });
});
