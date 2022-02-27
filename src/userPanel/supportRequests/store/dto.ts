export interface SupportRequestsDto {
    supportRequests: SupportRequestModel[];
}

export interface SupportRequestModel {
    title: string;
    description: string;
    department: string;
    content: string;
}
