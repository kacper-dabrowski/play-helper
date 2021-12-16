import axios from '../../libs/axios';
import { RequestStatus } from '../../shared/requestStatus/requestStatus';
import urls from '../../shared/urls';

export class UserService {
    constructor() {
        this.userRequest = new RequestStatus();
        this.updateUserRequest = new RequestStatus();
    }

    async fetchUserSettings() {
        const response = this.userRequest(() => axios.get(urls.settings));

        if (!response) {
            return { error: this.userRequest.error };
        }
    }

    async updateUserSettings(settings) {
        const response = this.updateUserRequest(() => axios.post(urls.settings, settings));

        if (!response) {
            return { error: this.userRequest.error };
        }
    }
}

let userService;

export const createUserService = () => {
    if (!userService) {
        userService = new UserService();
    }

    return userService;
};
