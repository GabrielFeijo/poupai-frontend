import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatRelativeTime } from '@/lib/formatters';
import { useExpenses } from '@/hooks/expenses/useExpenses';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EXPENSE_TYPES } from '@/lib/constants';
import { Clock, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const RecentExpenses = () => {
    const { data: expensesData, isLoading } = useExpenses({
        limit: 8,
    });

    if (isLoading) {
        return (
            <Card className="h-full">
                <CardContent className="flex items-center justify-center p-6">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (!expensesData?.expenses.length) {
        return (
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        Transações Recentes
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
                            <Clock className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">Nenhuma transação encontrada</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        Transações Recentes
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {expensesData.expenses.length} transações
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-3">
                    {expensesData.expenses.map((expense, index) => (
                        <div
                            key={expense.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-md transition-all duration-200 animate-in slide-in-from-left-4 fill-mode-both"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="h-4 w-4 rounded-full ring-1 ring-white dark:ring-gray-800 shadow-sm"
                                        style={{ backgroundColor: expense.category.color }}
                                    />
                                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${expense.type === 'INCOME' ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                        {expense.type === 'INCOME' ? (
                                            <ArrowUpCircle className="w-3 h-3 text-white" />
                                        ) : (
                                            <ArrowDownCircle className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-medium text-sm truncate">
                                            {expense.description}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className={`text-xs px-2 py-0 ${expense.type === 'INCOME'
                                                ? 'border-green-200 text-green-700 dark:border-green-800 dark:text-green-400'
                                                : 'border-red-200 text-red-700 dark:border-red-800 dark:text-red-400'
                                                }`}
                                        >
                                            {EXPENSE_TYPES[expense.type].label}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{expense.category.name}</span>
                                        <span>•</span>
                                        <span>{formatRelativeTime(expense.date)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className={`font-semibold text-sm ${expense.type === 'INCOME'
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                    }`}>
                                    {expense.type === 'INCOME' ? '+' : '-'}
                                    {formatCurrency(expense.amount)}
                                </p>
                                <div className={`w-full h-1 rounded-full mt-1 ${expense.type === 'INCOME'
                                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                                    : 'bg-gradient-to-r from-red-400 to-red-600'
                                    }`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {expensesData.expenses.length >= 8 && (
                    <div className="mt-4 text-center">
                        <p className="text-xs text-muted-foreground">
                            Exibindo as 8 transações mais recentes
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};