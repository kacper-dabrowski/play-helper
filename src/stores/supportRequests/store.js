import { makeAutoObservable } from 'mobx';
import { createSupportRequestService, SupportRequestService } from './service';

export class SupportRequestsStore {
    constructor(supportRequestsService = new SupportRequestService()) {
        this.supportRequestsService = supportRequestsService;
        this.supportRequests = null;
        makeAutoObservable(this);
    }

    get fetchSupportRequestsRequest() {
        return this.supportRequestsService.fetchSupportRequestsRequest;
    }

    get updateSupportRequestRequest() {
        return this.supportRequestsService.updateSupportRequestRequest;
    }

    get removeSupportRequestRequest() {
        return this.supportRequestsService.removeSupportRequestRequest;
    }

    get addSupportRequestRequest() {
        return this.supportRequestsService.addSupportRequestRequest;
    }

    refreshSupportRequests = async () => {
        const data = await this.supportRequestsService.fetchSupportRequests();

        this.supportRequests = data?.supportRequests;
    };

    addSupportRequest = async ({ title, description, department, content }) => {
        const data = await this.supportRequestsService.addSupportRequest({ title, description, department, content });

        await this.refreshSupportRequests();

        return !!data.error;
    };

    updateSupportRequest = async ({ title, description, department, content, srqId }) => {
        const data = await this.supportRequestsService.updateSupportRequest({
            srqId,
            title,
            description,
            department,
            content,
        });

        await this.refreshSupportRequests();

        return !!data.error;
    };

    removeSupportRequest = async (payload) => {
        const data = await this.supportRequestsService.removeSupportRequest(payload);

        await this.refreshSupportRequests();

        return !!data.error;
    };
}

let supportRequestsStore;

export const createSupportRequestsStore = () => {
    if (!supportRequestsStore) {
        supportRequestsStore = new SupportRequestsStore(createSupportRequestService());
    }

    return supportRequestsStore;
};
