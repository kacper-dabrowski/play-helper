import { generateOpenedDoubleTemplate } from './openedDouble';

describe('modules - openedDouble', () => {
    it('should return a valid doubled notification response', () => {
        expect(generateOpenedDoubleTemplate('1234', '4567'))
            .toEqual(`Dziękujemy za zgłoszenie 1234. Informujemy, że odpowiedź zostanie udzielona w zgłoszeniu 4567, w którym poruszone są te same kwestie.
  
Z poważaniem,
Obsługa Klienta Play`);
    });

    [
        { numOfCurrent: undefined, numofOpened: '1234', caseName: 'numOfCurrent' },
        { numOfCurrent: '1234', numofOpened: undefined, caseName: 'numOfOpened' },
    ].forEach(({ numOfCurrent, numofOpened, caseName }) => {
        it('should throw, if one of necessary arguments is not passed: ' + caseName, () => {
            expect(() => generateOpenedDoubleTemplate(numOfCurrent, numofOpened)).toThrow();
        });
    });
});
