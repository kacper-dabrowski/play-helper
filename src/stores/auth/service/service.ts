import { LoginDto, RegistrationDto } from '../model';

export interface AuthService {
    login: (loginDto: LoginDto) => Promise<any>;
    register: (registrationDto: RegistrationDto) => Promise<any>;
}
