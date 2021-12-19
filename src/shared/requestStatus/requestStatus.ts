import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export class RequestStatus {
    loading: boolean;

    error: string;

    constructor() {
        this.loading = false;
        this.error = '';
        makeAutoObservable(this);
    }

    async handle<T>(fn: () => Promise<T>): Promise<T | undefined> {
        try {
            this.loading = true;

            const response = await fn();

            this.loading = false;

            return response;
        } catch (error) {
            this.loading = false;

            if (axios.isAxiosError(error)) {
                this.error = error.response?.statusText || 'Wystąpił nieznany błąd';

                return;
            }

            if (error instanceof Error) {
                this.error = error.message;
                return;
            }

            this.error = 'Wystąpił nieznany błąd';
        }
    }

    reset() {
        this.loading = false;
        this.error = '';
    }
}
