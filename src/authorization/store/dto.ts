import { Maybe } from '../../shared/types/types';

export interface SessionDto {
    token: string;
    userId: string;
    fullName: string;
    expiresIn: number;
}

export interface RegistrationDto {
    message: string;
    token: Maybe<string>;
    userId: Maybe<string>;
    expiresIn: Maybe<number>;
}
