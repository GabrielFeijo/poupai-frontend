import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import { useExpensesSummary } from '@/hooks/expenses/useExpensesSummary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const DashboardStats = () => {
    const { data: summary, isLoading } = useExpensesSummary();

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse rounded-2xl shadow-sm">
                        <CardContent className="flex items-center justify-center p-6 h-32">
                            <LoadingSpinner />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!summary) return null;

    const stats = [
        {
            title: 'Receitas',
            value: formatCurrency(summary.totalIncome),
            icon: TrendingUp,
            bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
            textColor: 'text-green-700 dark:text-green-300',
            valueColor: 'text-green-900 dark:text-green-100',
            iconBg: 'bg-green-200 dark:bg-green-800/50',
            iconColor: 'text-green-600 dark:text-green-400',
        },
        {
            title: 'Despesas',
            value: formatCurrency(summary.totalExpenses),
            icon: TrendingDown,
            bgGradient: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
            textColor: 'text-red-700 dark:text-red-300',
            valueColor: 'text-red-900 dark:text-red-100',
            iconBg: 'bg-red-200 dark:bg-red-800/50',
            iconColor: 'text-red-600 dark:text-red-400',
        },
        {
            title: 'Saldo',
            value: formatCurrency(summary.balance),
            icon: DollarSign,
            bgGradient: summary.balance >= 0
                ? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
                : 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
            textColor: summary.balance >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-red-700 dark:text-red-300',
            valueColor: summary.balance >= 0 ? 'text-blue-900 dark:text-blue-100' : 'text-red-900 dark:text-red-100',
            iconBg: summary.balance >= 0 ? 'bg-blue-200 dark:bg-blue-800/50' : 'bg-red-200 dark:bg-red-800/50',
            iconColor: summary.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400',
        },
        {
            title: 'Categorias',
            value: summary.expensesByCategory.length.toString(),
            icon: PieChart,
            bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
            textColor: 'text-purple-700 dark:text-purple-300',
            valueColor: 'text-purple-900 dark:text-purple-100',
            iconBg: 'bg-purple-200 dark:bg-purple-800/50',
            iconColor: 'text-purple-600 dark:text-purple-400',
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card
                    key={stat.title}
                    className={`bg-gradient-to-r ${stat.bgGradient} border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 fill-mode-both`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>

                                <p className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                            </div>
                        </div>
                        <div className={`p-2 rounded-full ${stat.iconBg} absolute top-4 right-4`}>
                            <stat.icon className={`h-3 w-3 ${stat.iconColor}`} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
