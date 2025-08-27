import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/types/auth.types';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	logout: () => void;
}

const cookieStorage = {
	getItem: (name: string): string | null => {
		return Cookies.get(name) || null;
	},

	setItem: (name: string, value: string): void => {
		Cookies.set(name, value, {
			expires: 7, // 7 dias
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
		});
	},

	removeItem: (name: string): void => {
		Cookies.remove(name, {
			path: '/',
			sameSite: 'strict',
		});
	},
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,

			setUser: (user) => set({ user, isAuthenticated: true }),

			setToken: (token) => {
				Cookies.set('auth-token', token, {
					expires: 7,
					path: '/',
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
				});
				set({ token });
			},

			logout: () => {
				Cookies.remove('auth-token', {
					path: '/',
					sameSite: 'strict',
				});
				set({ user: null, token: null, isAuthenticated: false });
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => cookieStorage),
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
