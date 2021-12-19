import { RequestStatus } from '../../shared/requestStatus/requestStatus.ts';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

export class SupportRequestService {
    constructor() {
        this.fetchSupportRequestsRequest = new RequestStatus();
        this.updateSupportRequestRequest = new RequestStatus();
        this.removeSupportRequestRequest = new RequestStatus();
        this.addSupportRequestRequest = new RequestStatus();
    }

    fetchSupportRequests = async () => {
        const response = await this.fetchSupportRequestsRequest.handle(() => axios.get(urls.srq));

        if (!response) {
            return { error: this.fetchSupportRequestsRequest.error };
        }

        return response.data;
    };

    addSupportRequest = async ({ title, description, department, content }) => {
        const response = await this.addSupportRequestRequest.handle(() =>
            axios.put(urls.srq, { title, description, department, content })
        );

        if (!response) {
            return { error: this.addSupportRequestRequest.error };
        }

        return response.data;
    };

    updateSupportRequest = async ({ srqId, title, description, department, content }) => {
        const response = await this.updateSupportRequestRequest.handle(() =>
            axios.post(`${urls.srq}/${srqId}`, { title, description, department, content })
        );

        if (!response) {
            return { error: this.updateSupportRequestsRequest.error };
        }

        return response.data;
    };

    removeSupportRequest = async ({ srqId }) => {
        const response = await this.removeSupportRequestRequest.handle(() => axios.delete(`${urls.srq}/${srqId}`));

        if (!response) {
            return { error: this.removeSupportRequestRequest.error };
        }

        return response.data;
    };
}

let supportRequestService;

export const createSupportRequestService = () => {
    if (!supportRequestService) {
        supportRequestService = new SupportRequestService();
    }

    return supportRequestService;
};
