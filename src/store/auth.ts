import {create} from 'zustand';

interface AuthStore {
    token : string | null;
    email : string | null;
    isAuthenticated : boolean;
    setAuth : (token : string, email : string) => void;
    clearAuth : () => void;
    initFromStorage : () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token : null,
    email : null,
    isAuthenticated : false,
    setAuth : (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        set({token, email, isAuthenticated: true});
    },
    clearAuth : () => set({token: null, email: null, isAuthenticated: false}),
    initFromStorage : () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if(token && email){
            set({token, email, isAuthenticated: true});
        }
    }
}));