import axios from '../../../libs/axios';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import urls from '../../../shared/urls';
import { LoginDto, RegistrationDto } from '../model';
import { AuthService } from './service';

let authService: DefaultAuthService;

export class DefaultAuthService implements AuthService {
    loginRequest: RequestStatus;

    registrationRequest: RequestStatus;

    constructor() {
        this.loginRequest = new RequestStatus();
        this.registrationRequest = new RequestStatus();
    }

    login = async ({ username, password }: LoginDto): Promise<any> => {
        this.loginRequest.reset();

        const response = await this.loginRequest.handle(() => axios.post(urls.login, { username, password }));

        if (!response) {
            return { error: this.loginRequest.error };
        }

        return response.data;
    };

    register = async ({ username, password, repeatPassword, fullName }: RegistrationDto): Promise<Maybe<any>> => {
        this.registrationRequest.reset();

        const response = await this.registrationRequest.handle(() =>
            axios.post(urls.signup, { username, password, repeatPassword, fullName })
        );

        if (!response) {
            return;
        }

        return response.data;
    };
}

export const createAuthService = () => {
    if (!authService) {
        authService = new DefaultAuthService();
    }

    return authService;
};
