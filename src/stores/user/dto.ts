export interface UserSettingsDto {
    settings: {
        startingPage: string;
    };
}

export interface UserSettingsModel {
    startingPage: string | null;
}
