import axios from '../../libs/axios';
import { RequestStatus } from '../../shared/requestStatus/requestStatus.ts';
import urls from '../../shared/urls';

let authService;

export class AuthService {
    constructor() {
        this.loginRequest = new RequestStatus();
        this.registrationRequest = new RequestStatus();
    }

    login = async ({ username, password }) => {
        this.loginRequest.reset();

        const response = await this.loginRequest.handle(() => axios.post(urls.login, { username, password }));

        if (!response) {
            return { error: this.loginRequest.error };
        }

        return response.data;
    };

    register = async ({ username, password, repeatPassword, fullName }) => {
        this.registrationRequest.reset();

        const response = await this.loginRequest.handle(() =>
            axios.post(urls.signup, { username, password, repeatPassword, fullName })
        );

        if (!response) {
            return { error: this.registrationRequest.error };
        }

        return response.data;
    };
}

export const createAuthService = () => {
    if (!authService) {
        authService = new AuthService();
    }

    return authService;
};
