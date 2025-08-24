import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    Tags,
    FileText,
    TrendingUp,
    User,
    LogOut,
    Coins,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const navigation = [
    { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Despesas', href: ROUTES.EXPENSES, icon: CreditCard },
    { name: 'Categorias', href: ROUTES.CATEGORIES, icon: Tags },
    { name: 'Relatórios', href: ROUTES.REPORTS, icon: FileText },
    { name: 'Dados Externos', href: ROUTES.EXTERNAL_DATA, icon: TrendingUp },
];

interface SidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Sidebar = ({ open, setOpen }: SidebarProps) => {
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={cn(
                    "fixed top-0 left-0 h-screen w-64 bg-card shadow-lg z-50 transform transition-transform flex justify-between flex-col",
                    open ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0 md:fixed md:z-auto"
                )}
            >
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <Coins className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-semibold">poupAí</span>
                    </div>
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )}
                                onClick={() => setOpen(false)}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={logout}
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </Button>
                </div>
            </div>
        </>
    );
};
