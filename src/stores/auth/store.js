import { makeAutoObservable, onBecomeObserved } from 'mobx';
import { AuthService, createAuthService } from './service';

let authStore;

export class AuthStore {
    constructor(authService = new AuthService()) {
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

    login = async ({ username, password, onSuccess }) => {
        const data = await this.authService.login({ username, password });

        if (data.error) {
            throw new Error(data.error);
        }

        const { token: idToken, userId, fullName, expiresIn } = data;

        if (!idToken || !userId) {
            throw new Error('Unable to authenticate');
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

        this._checkTimeout(expiresIn);

        if (onSuccess && typeof onSuccess === 'function') {
            onSuccess();
        }
    };

    register = async ({ username, password, repeatPassword, fullName }) => {
        const response = await this.authService.register({ username, password, repeatPassword, fullName });

        if (response.error) {
            throw new Error(response.error);
        }

        await this.login({ username, password });
    };

    logout = async () => {
        this.user = null;
        clearTimeout(this.logoutTimeoutId);
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

        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        const isTokenValid = expirationDate.getTime() >= new Date().getTime();

        if (isTokenValid) {
            this.user = {
                token,
                userId,
                fullName,
            };

            const calculatedTimeLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;

            return this._checkTimeout(calculatedTimeLeft);
        }

        return this.logout();
    };

    _checkTimeout = async (expiresIn) => {
        clearTimeout(this.logoutTimeoutId);
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
