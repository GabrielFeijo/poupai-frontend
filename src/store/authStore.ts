import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth.types';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			setUser: (user) => set({ user, isAuthenticated: true }),
			setToken: (token) => {
				localStorage.setItem('auth-token', token);
				set({ token });
			},
			logout: () => {
				localStorage.removeItem('auth-token');
				set({ user: null, token: null, isAuthenticated: false });
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
