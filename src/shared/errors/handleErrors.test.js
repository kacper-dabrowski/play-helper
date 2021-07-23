import { getLastMessageFromFormikErrors } from './handleErrors';

describe('shared - errors - handleErrors', () => {
    it('should return the last error from the stack', () => {
        const dummyErrors = {
            dummy: 'error',
            anotherDummy: 'error2',
        };

        const firstMessage = getLastMessageFromFormikErrors(dummyErrors);

        expect(firstMessage).toEqual('error2');

        delete dummyErrors.anotherDummy;

        const secondMessage = getLastMessageFromFormikErrors(dummyErrors);

        expect(secondMessage).toEqual('error');
    });
});
