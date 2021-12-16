import { makeAutoObservable, onBecomeObserved } from 'mobx';
import { createUserService, UserService } from './service';

export class UserStore {
    constructor(userService = new UserService()) {
        this.userService = userService;
        this.settings = null;
        makeAutoObservable(this);
        onBecomeObserved(this, 'settings', this.fetchUserSettings);
    }

    get updateUserRequest() {
        return this.userService.updateUserRequest;
    }

    get fetchUserRequest() {
        return this.userService.userRequest;
    }

    fetchUserSettings = async () => {
        const response = await this.userService.fetchUserSettings();

        if (response?.error) {
            return response.error;
        }

        if (!response?.settings) {
            return;
        }

        this.settings = response.settings;
    };

    updateSettings = async (settings) => {
        const data = await this.userService.updateUserSettings(settings);

        if (data?.error) {
            return data.error;
        }
    };
}

let userStore;

export const createUserStore = () => {
    if (!userStore) {
        userStore = new UserStore(createUserService());
    }

    return userStore;
};
