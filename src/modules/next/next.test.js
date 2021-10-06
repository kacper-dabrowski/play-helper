import config from '../../shared/identifiers';
import { isEvening, isPolish, returnSalutationArray } from './next';
import identifiers from '../../shared/identifiers';

describe('modules - next', () => {
    describe('isEvening', () => {
        const setEvening = () => jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01 18:01').getTime());
        const setMorning = () => jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01 8:00').getTime());

        [
            { language: config.language.polish, expected: { evening: 'wieczoru', morning: 'dnia' } },
            { language: config.language.english, expected: { evening: 'evening', morning: 'day' } },
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
            { gender: config.sex.woman, expected: ['Pani', 'Pani', 'Pani', 'Panią', 'Panią', 'Pani', 'Pani'] },
            { gender: config.sex.man, expected: ['Pan', 'Pana', 'Panu', 'Pana', 'Panem', 'Panu', 'Panie'] },
        ].forEach(({ gender, expected }) => {
            expect(returnSalutationArray(gender)).toEqual(expected);
        });
        it('should throw if gender is unknown', () => {
            expect(() => returnSalutationArray('unknown')).toThrow();
        });
    });

    describe('isPolish', () => {
        it('should return true if the language is polish', () => {
            expect(isPolish(config.language.polish)).toEqual(true);
        });
        it('should return false if the language is english', () => {
            expect(isPolish(config.language.english)).toEqual(false);
        });
    });
});
