import { register } from 'module';
import {api} from './client';

export interface AuthResponse {
    token: string;
    email: string;
}

export const authAPI = {
    register:(email: string, password: string) =>
        api.post<AuthResponse>('/api/auth/register', {email,password}),

    login: (email: string, password: string) =>
        api.post<AuthResponse>('/api/auth/login', {email, password}),

    logout : () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email')
    },
};