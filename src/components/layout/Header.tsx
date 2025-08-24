import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

const getPageTitle = (pathname: string): string => {
    const routes: Record<string, string> = {
        [ROUTES.DASHBOARD]: "Dashboard",
        [ROUTES.EXPENSES]: "Despesas",
        [ROUTES.CATEGORIES]: "Categorias",
        [ROUTES.REPORTS]: "Relatórios",
        [ROUTES.EXTERNAL_DATA]: "Dados de Mercado",
    };

    return routes[pathname] ?? "Dashboard";
};

export const Header = () => {
    const { user } = useAuth();
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {pageTitle}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Bem-vindo de volta, {user?.name?.split(' ')[0]}!
                        </p>
                    </div>
                    <div className="sm:hidden">
                        <h1 className="text-lg font-semibold">{pageTitle}</h1>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <Search className="h-4 w-4" />
                </Button>

                <ThemeToggle />

                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm"
                >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Button>
            </div>
        </header>
    );
};