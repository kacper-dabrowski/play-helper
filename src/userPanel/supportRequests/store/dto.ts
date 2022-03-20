export interface SupportRequestsDto {
    supportRequests: SupportRequestDto[];
}

interface SupportRequestDto {
    _id: string;
    title: string;
    description: string;
    department: string;
    content: string;
}

export interface SupportRequestModel {
    _id: string;
    title: string;
    description: string;
    department: string;
    content: string;
}

export interface ModifySupportRequestDto extends SupportRequestModel {
    _id: string;
}

export const fakeSupportRequestModel: SupportRequestModel = {
    _id: '1234',
    title: 'Fake title',
    description: 'Fake description',
    department: 'Fake department',
    content: 'Fake content',
};

export const fakeSupportRequestsDto: SupportRequestsDto = {
    supportRequests: [
        {
            _id: '1234',
            title: 'Fake title',
            description: 'Fake description',
            department: 'Fake department',
            content: 'Fake content',
        },
    ],
};
