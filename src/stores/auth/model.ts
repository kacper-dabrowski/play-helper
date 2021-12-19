import { Maybe } from '../../shared/types/types';

export interface LoginDto {
    username: string;
    password: string;
}

export interface RegistrationDto extends LoginDto {
    repeatPassword: string;
    fullName: string;
}

export interface UserModel {
    fullName: Maybe<string>;
    token: Maybe<string>;
    userId: Maybe<string>;
}
