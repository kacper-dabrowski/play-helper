import { Maybe } from '../types/types';

export interface RequestStatus {
    loading: boolean;
    error: string;
    success: Maybe<boolean>;
}
export const createRequestStatus = (): RequestStatus => ({ error: '', loading: false, success: null });

export const requestFinishedSuccessfully = (): RequestStatus => {
    return {
        error: '',
        loading: false,
        success: true,
    };
};

export const requestFinishedWithError = (error: string | undefined): RequestStatus => {
    return {
        error: error || 'Coś poszło nie tak, spróbuj ponownie później.',
        loading: false,
        success: false,
    };
};

export const requestLoading = (): RequestStatus => {
    return {
        error: '',
        loading: true,
        success: null,
    };
};
