import React from 'react';
import { render } from '@testing-library/react';
import { useFormikError } from './useFormikError';
import { toastProvider } from '../libs/toast';

describe('hooks - useFormikError', () => {
    const emptyFormikErrors = {};
    const oneFormikError = {
        someField: 'some error',
    };
    const DummyComponent = ({ formikErrors }) => {
        useFormikError(formikErrors);

        return <div />;
    };
    it('should show no error, if there is no formik error', () => {
        render(<DummyComponent formikErrors={emptyFormikErrors} />);

        const toastMock = jest.spyOn(toastProvider, 'error').mockImplementation(() => jest.fn());

        expect(toastMock).not.toHaveBeenCalled();
    });

    it('should show an error, if there is formik error', () => {
        render(<DummyComponent formikErrors={oneFormikError} />);

        const toastMock = jest.spyOn(toastProvider, 'error').mockImplementation(() => jest.fn());

        expect(toastMock).toHaveBeenCalledWith('some error');
    });
});
