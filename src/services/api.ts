import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
});

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get('auth-token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			Cookies.remove('auth-token');
			Cookies.remove('auth-storage');
			window.location.href = '/login';
		}

		const message = error.response?.data?.message || 'Erro inesperado';
		toast.error(message);

		return Promise.reject(error);
	}
);
