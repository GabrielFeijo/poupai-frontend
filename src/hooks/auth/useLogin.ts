import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest } from '@/types/auth.types';

export const useLogin = () => {
	const navigate = useNavigate();
	const { setUser, setToken } = useAuthStore();

	return useMutation({
		mutationFn: (credentials: LoginRequest) => authService.login(credentials),
		onSuccess: (data) => {
			setUser(data.user);
			setToken(data.access_token);
			toast.success('Login realizado com sucesso!');
			navigate('/dashboard');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao fazer login');
		},
	});
};
