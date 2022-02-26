import { useEffect, useMemo, useState } from 'react';
import axios from '../libs/axios';
import { toastProvider } from '../libs/toast';
import urls from '../shared/urls';

export const REQUEST_METHODS = {
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    GET: 'get',
    DELETE: 'delete',
    OPTIONS: 'options',
};

const sendRequest = async (requestConfig) => {
    const { url, method, data, setResponse, setIsLoading, setError } = requestConfig;
    try {
        setIsLoading(true);

        const fetchedData = await axios[method](url, data);
        setResponse(fetchedData);

        setIsLoading(false);
    } catch (error) {
        let returnedError;

        switch (error?.response?.status) {
            case 401:
                returnedError = new Error('Nie możesz skorzystać z tej funkcji jako niezalogowany użytkownik');
                break;
            case 409:
                if (url === urls.signup) {
                    returnedError = new Error('Taki użytkownik już istnieje, spróbuj się zalogować.');
                }
                break;
            default:
                returnedError = new Error('Nie udało się pobrać danych z serwera. Spróbuj ponownie później');
        }

        setIsLoading(false);
        setError(returnedError);
    }
};

const useRequest = (url, method = REQUEST_METHODS.GET, data = null) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const requestConfig = useMemo(
        () => ({
            url,
            method,
            data,
            setResponse,
            setIsLoading,
            setError,
        }),
        [data, method, url]
    );

    useEffect(() => {
        if (method === REQUEST_METHODS.GET) {
            sendRequest(requestConfig);
        }
    }, [url, method, data, requestConfig]);

    useEffect(() => {
        if (error) {
            toastProvider.error(error.message);
        }
    }, [error]);

    if (method !== REQUEST_METHODS.GET) {
        return {
            requestHandler: async (dataToSend, getUrl) =>
                sendRequest({ ...requestConfig, data: dataToSend, url: getUrl() }),
            error,
            response,
            isLoading,
        };
    }

    const requestHandler = async () => sendRequest(requestConfig);

    return { error, response, isLoading, requestHandler };
};

export default useRequest;
