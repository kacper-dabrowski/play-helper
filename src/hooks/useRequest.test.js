import { act, cleanup, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useRequest, { REQUEST_METHODS } from './useRequest';

describe('useRequest hook', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('should send a valid get request on mount, return response and stop loading', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => 'fakeResponse');
        const { waitForNextUpdate, result } = renderHook(() => useRequest('any'));

        await waitForNextUpdate();

        return waitFor(() => {
            expect(axiosSpy).toHaveBeenCalled();
            expect(result.current.response).toEqual('fakeResponse');
            expect(result.current.isLoading).toEqual(false);
        });
    });

    it('should set a loading state when request started, but is not finished', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => 'fakeResponse');
        let renderResult;

        act(() => {
            const { result } = renderHook(() => useRequest('any'));
            renderResult = result;
        });

        return waitFor(() => {
            expect(axiosSpy).toHaveBeenCalled();
            expect(renderResult.current.isLoading).toEqual(true);
        });
    });

    it('should set an error state when request failed and finish loading', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => {
            throw new Error('errored');
        });

        const { result } = renderHook(() => useRequest('any'));

        return waitFor(() => {
            expect(axiosSpy).toHaveBeenCalled();
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.error).toEqual(
                new Error('Nie udało się pobrać danych z serwera. Spróbuj ponownie później')
            );
        });
    });

    it('should return request handler that sends request again', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => {
            throw new Error('errored');
        });

        const { result } = renderHook(() => useRequest('any'));

        act(() => {
            result.current.requestHandler(null, () => 'url');
        });

        return waitFor(() => {
            expect(axiosSpy).toHaveBeenCalledTimes(2);
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.error).toEqual(
                new Error('Nie udało się pobrać danych z serwera. Spróbuj ponownie później')
            );
        });
    });
    it('should call a get request when no request method provided', () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => 'fakeResponse');

        renderHook(() => useRequest('any'));

        return waitFor(() => {
            expect(axiosSpy).toHaveBeenCalledWith('any', null);
        });
    });
    Object.values(REQUEST_METHODS).forEach((given) => {
        if (given !== 'get') {
            it(`should not immediately call ${given} request `, () => {
                const axiosSpy = jest.spyOn(axios, given).mockImplementation(() => 'fakeResponse');

                renderHook(() => useRequest('any', given));

                return waitFor(() => {
                    expect(axiosSpy).not.toHaveBeenCalled();
                });
            });

            it(`should prepare a request caller with ${given} method and data`, async () => {
                const axiosSpy = jest.spyOn(axios, given).mockImplementation(() => 'fakeResponse');

                const { result } = renderHook(() => useRequest('any', given));

                await act(async () => {
                    result.current.requestHandler({ some: 'data' }, () => 'any');
                });

                return waitFor(() => {
                    expect(axiosSpy).toHaveBeenCalledWith('any', { some: 'data' });
                });
            });
        }
    });
});
