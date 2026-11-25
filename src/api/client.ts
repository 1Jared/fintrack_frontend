import axios, { type AxiosError, type AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fintrack-backend-lfvw.onrender.com';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
}); 

//addadd token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

//Hanndle responses
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: unknown) => {
        const axiosError = error as AxiosError;
        if (axios.isAxiosError(axiosError) && axiosError.response?.status === 401) {
            // Handle unauthorized access, e.g., redirect to login page
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);  

export default api;