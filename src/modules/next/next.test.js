import { Language, Salutation } from '../../shared/identifiers';
import { isEvening, isPolish, returnSalutationArray } from './next';

describe('modules - next', () => {
    describe('isEvening', () => {
        const setEvening = () => jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01 18:01').getTime());
        const setMorning = () => jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01 8:00').getTime());

        [
            { language: Language.Polish, expected: { evening: 'wieczoru', morning: 'dnia' } },
            { language: Language.English, expected: { evening: 'evening', morning: 'day' } },
        ].forEach(({ language, expected }) => {
            it(`should return evening version in ${language} language`, () => {
                setEvening();
                const result = isEvening(language);

                expect(result).toEqual(expected.evening);
            });

            it(`should return the morning version in ${language} language`, () => {
                setMorning();
                const result = isEvening(language);

                expect(result).toEqual(expected.morning);
            });
        });

        it('should throw, if language is not recognized', () => {
            expect(() => isEvening('unknown')).toThrow('Nie rozpoznano języka');
        });
    });

    describe('returnSalutationArray', () => {
        [
            { gender: Salutation.Woman, expected: ['Pani', 'Pani', 'Pani', 'Panią', 'Panią', 'Pani', 'Pani'] },
            { gender: Salutation.Man, expected: ['Pan', 'Pana', 'Panu', 'Pana', 'Panem', 'Panu', 'Panie'] },
        ].forEach(({ gender, expected }) => {
            it(`should return expected salutation array for ${gender}`, () => {
                expect(returnSalutationArray(gender)).toEqual(expected);
            });
        });
        it('should throw if gender is unknown', () => {
            expect(() => returnSalutationArray('unknown')).toThrow();
        });
    });

    describe('isPolish', () => {
        it('should return true if the language is polish', () => {
            expect(isPolish(Language.Polish)).toEqual(true);
        });
        it('should return false if the language is english', () => {
            expect(isPolish(Language.English)).toEqual(false);
        });
    });
});
