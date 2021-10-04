export const createRequestStatus = () => ({ error: '', loading: false });

export const requestFinishedSuccessfully = () => {
    return {
        error: '',
        loading: false,
    };
};

export const requestFinishedWithError = (error) => {
    return {
        error,
        loading: false,
    };
};

export const requestLoading = () => {
    return {
        loading: true,
    };
};
