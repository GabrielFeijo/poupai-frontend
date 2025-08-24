import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { useThemeStore } from '@/store/themeStore';
import { ROUTES } from '@/lib/constants';
import '@/index.css';
import { ExternalDataPage } from './pages/ExternalDataPage';
import { ReportsPage } from './pages/ReportsPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { CategoriesPage } from './pages/CategoriesPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

function App() {
    const { theme } = useThemeStore();

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className={theme}>
                    <Routes>
                        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                            <Route path={ROUTES.EXPENSES} element={<ExpensesPage />} />
                            <Route path={ROUTES.EXTERNAL_DATA} element={<ExternalDataPage />} />
                            <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
                            <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
                        </Route>
                    </Routes>
                </div>
            </Router>

            <Toaster
                position="bottom-right"
                richColors
                closeButton
            />

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;