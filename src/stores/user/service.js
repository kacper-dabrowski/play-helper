import axios from '../../libs/axios';
import { RequestStatus } from '../../shared/requestStatus/requestStatus';
import urls from '../../shared/urls';

export class UserService {
    constructor() {
        this.userRequest = new RequestStatus();
        this.updateUserRequest = new RequestStatus();
    }

    async fetchUserSettings() {
        const response = await this.userRequest.handle(() => axios.get(urls.settings));

        if (!response) {
            return { error: this.userRequest.error };
        }

        return response.data;
    }

    async updateUserSettings(settings) {
        const response = await this.updateUserRequest.handle(() => axios.post(urls.settings, settings));

        if (!response) {
            return { error: this.userRequest.error };
        }

        return response.data;
    }
}

let userService;

export const createUserService = () => {
    if (!userService) {
        userService = new UserService();
    }

    return userService;
};
