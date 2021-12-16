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
        error: '',
        loading: true,
    };
};

export class RequestStatus {
    constructor() {
        this.loading = false;
        this.error = '';
    }

    async handle(fn) {
        try {
            this.loading = true;

            const response = await fn();

            this.loading = false;

            return response;
        } catch (error) {
            this.error = error.response.message || error.message || 'Wystąpił nieznany błąd.';
        } finally {
            this.loading = false;
        }
    }

    reset() {
        this.loading = false;
        this.error = '';
    }
}
