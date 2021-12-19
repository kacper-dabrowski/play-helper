import { makeAutoObservable, onBecomeObserved } from 'mobx';
import { Maybe } from '../../../shared/types/types';
import { LoginDto, RegistrationDto, UserModel } from '../model';
import { DefaultAuthService, createAuthService } from '../service/defaultService';

let authStore: AuthStore;

export class AuthStore {
    private logoutTimeoutId: Maybe<ReturnType<typeof setTimeout>>;

    user: Maybe<UserModel>;

    constructor(private authService = new DefaultAuthService()) {
        this.authService = authService;
        this.logoutTimeoutId = null;
        this.user = {
            token: null,
            userId: null,
            fullName: '',
        };

        makeAutoObservable(this);
        onBecomeObserved(this, 'user', this.checkAuthState);
    }

    get loginRequest() {
        return this.authService.loginRequest;
    }

    get registrationRequest() {
        return this.authService.registrationRequest;
    }

    login = async (loginDto: LoginDto, onSuccess?: () => void) => {
        const data = await this.authService.login(loginDto);

        if (data?.error) {
            return;
        }

        const { token: idToken, userId, fullName, expiresIn } = data;

        if (!idToken || !userId) {
            return;
        }

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationDate', expirationDate.toString());
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('userId', userId);

        this.user = {
            token: idToken,
            userId,
            fullName,
        };

        this.checkTimeout(expiresIn);

        if (onSuccess && typeof onSuccess === 'function') {
            onSuccess();
        }
    };

    register = async (registrationDto: RegistrationDto): Promise<void> => {
        await this.authService.register(registrationDto);

        if (this.registrationRequest.error) {
            return;
        }

        const { username, password } = registrationDto;

        await this.login({ username, password });
    };

    logout = async () => {
        this.user = null;

        if (this.logoutTimeoutId) {
            clearTimeout(this.logoutTimeoutId);
        }

        this.logoutTimeoutId = null;
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('fullName');
        localStorage.removeItem('userId');
    };

    checkAuthState = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return this.logout();
        }
        const userId = localStorage.getItem('userId');
        const fullName = localStorage.getItem('fullName');

        const maybeExpirationDateFromLocalStorage = localStorage.getItem('expirationDate');

        if (!maybeExpirationDateFromLocalStorage) {
            return this.logout();
        }

        const expirationDate = new Date(maybeExpirationDateFromLocalStorage);

        const isTokenValid = expirationDate.getTime() >= new Date().getTime();

        if (isTokenValid) {
            this.user = {
                token,
                userId,
                fullName,
            };

            const calculatedTimeLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;

            return this.checkTimeout(calculatedTimeLeft);
        }

        return this.logout();
    };

    checkTimeout = async (expiresIn: string | number) => {
        this.logoutTimeoutId = setTimeout(() => {
            this.logout();
        }, +expiresIn);
    };
}

export const createAuthStore = () => {
    if (!authStore) {
        authStore = new AuthStore(createAuthService());
    }

    return authStore;
};
