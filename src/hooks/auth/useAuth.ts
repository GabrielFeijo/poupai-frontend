import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { User } from '@/types/auth.types';

export const useAuth = () => {
	const { user, token, isAuthenticated, setUser, logout } = useAuthStore();

	const {
		data: profile,
		isSuccess,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: authService.getProfile,
		enabled: !!token && !user,
	});

	useEffect(() => {
		if (profile && isSuccess) {
			setUser(profile as User);
		}
	}, [profile, isSuccess]);

	useEffect(() => {
		if (isError) {
			logout();
		}
	}, [isError]);

	return {
		user: user || profile,
		isAuthenticated,
		isLoading,
		logout,
	};
};
