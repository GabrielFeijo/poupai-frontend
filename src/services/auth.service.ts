import { api } from './api';
import {
	AuthResponse,
	LoginRequest,
	RegisterRequest,
	User,
} from '@/types/auth.types';

export const authService = {
	login: async (credentials: LoginRequest): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>('/auth/login', credentials);
		return response.data;
	},

	register: async (userData: RegisterRequest): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>('/auth/register', userData);
		return response.data;
	},

	getProfile: async (): Promise<User> => {
		const response = await api.get<User>('/auth/profile');
		return response.data;
	},
};
