import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { RegisterRequest } from '@/types/auth.types';

export const useRegister = () => {
	const navigate = useNavigate();
	const { setUser, setToken } = useAuthStore();

	return useMutation({
		mutationFn: (userData: RegisterRequest) => authService.register(userData),
		onSuccess: (data) => {
			setUser(data.user);
			setToken(data.access_token);
			toast.success('Conta criada com sucesso!');
			navigate('/dashboard');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao criar conta');
		},
	});
};
