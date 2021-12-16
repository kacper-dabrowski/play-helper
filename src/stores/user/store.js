import { makeAutoObservable } from 'mobx';
import { createUserService, UserService } from './service';

export class UserStore {
    constructor(userService = new UserService()) {
        this.userService = userService;
        this.settings = null;
        makeAutoObservable(this);
    }

    get updateUserRequest() {
        return this.userService.updateUserRequest;
    }

    get fetchUserRequest() {
        return this.userService.userRequest;
    }

    async fetchUserSettings() {
        const response = await this.userService.fetchSettings();

        if (response.error) {
            return response.error;
        }

        this.settings = response?.data?.settings;
    }

    async updateSettings(settings) {
        const response = await this.userService.updateSettings(settings);

        if (response.error) {
            return response.error;
        }

        this.settings = response?.data?.settings;
    }
}

let userStore;

export const createUserStore = () => {
    if (!userStore) {
        userStore = new UserStore(createUserService());
    }

    return userStore;
};
