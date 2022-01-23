export interface RequestStatus {
    loading: boolean;
    error: string;
}
export const createRequestStatus = () => ({ error: '', loading: false });

export const requestFinishedSuccessfully = () => {
    return {
        error: '',
        loading: false,
    };
};

export const requestFinishedWithError = (error: string | undefined) => {
    return {
        error: error || 'Coś poszło nie tak, spróbuj ponownie później.',
        loading: false,
    };
};

export const requestLoading = () => {
    return {
        error: '',
        loading: true,
    };
};
