import { makeAutoObservable } from 'mobx';

export class RequestStatus {
    constructor() {
        this.loading = false;
        this.error = '';
        makeAutoObservable(this);
    }

    async handle(fn) {
        try {
            this.loading = true;

            const response = await fn();

            this.loading = false;

            return response;
        } catch (error) {
            this.loading = false;
            this.error = error.response.message || error.message || 'Wystąpił nieznany błąd.';
        }
    }

    reset() {
        this.loading = false;
        this.error = '';
    }
}
