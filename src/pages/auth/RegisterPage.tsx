import { Navigate } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROUTES } from '@/lib/constants';

export const RegisterPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return <RegisterForm />;
};