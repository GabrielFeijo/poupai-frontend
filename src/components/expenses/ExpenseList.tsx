import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExpenseFilter } from './ExpenseFilter';
import { ExpenseForm } from './ExpenseForm';
import { Pagination } from '@/components/common/Pagination';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useExpenses } from '@/hooks/expenses/useExpenses';
import { useDeleteExpense } from '@/hooks/expenses/useDeleteExpense';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { EXPENSE_TYPES } from '@/lib/constants';
import { ExpenseQuery, type Expense } from '@/types/expense.types';

export const ExpenseList = () => {
    const [filters, setFilters] = React.useState<ExpenseQuery>({
        page: 1,
        limit: 10,
    });
    const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [_, setDeleteExpenseId] = React.useState<string | null>(null);

    const { data, isLoading, error } = useExpenses(filters);
    const deleteMutation = useDeleteExpense();

    const handleFilter = (newFilters: ExpenseQuery) => {
        setFilters({
            ...newFilters,
            page: 1,
            limit: filters.limit,
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    const handlePageSizeChange = (limit: number) => {
        setFilters({ ...filters, limit, page: 1 });
    };

    const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteMutation.mutateAsync(id);
        setDeleteExpenseId(null);
    };

    const handleNewExpense = () => {
        setSelectedExpense(null);
        setIsFormOpen(true);
    };

    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-destructive">Erro ao carregar despesas</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <ExpenseFilter onFilter={handleFilter} initialFilters={filters} />
                <Button onClick={handleNewExpense}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Transação
                </Button>
            </div>


            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Lista de Transações</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <LoadingSpinner />
                        </div>
                    ) : !data?.expenses.length ? (
                        <div className="text-center p-8">
                            <p className="text-muted-foreground">Nenhuma transação encontrada</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead className="text-right">Valor</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.expenses.map((expense) => (
                                        <TableRow key={expense.id}>
                                            <TableCell className="font-medium">
                                                {formatDate(expense.date)}
                                            </TableCell>
                                            <TableCell>{expense.description}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-3 w-3 rounded-full"
                                                        style={{ backgroundColor: expense.category.color }}
                                                    />
                                                    {expense.category.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${EXPENSE_TYPES[expense.type].bgColor
                                                    } ${EXPENSE_TYPES[expense.type].color}`}>
                                                    {EXPENSE_TYPES[expense.type].label}
                                                </span>
                                            </TableCell>
                                            <TableCell className={`text-right font-medium ${expense.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {expense.type === 'INCOME' ? '+' : '-'}
                                                {formatCurrency(expense.amount)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(expense)}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setDeleteExpenseId(expense.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Confirmar Exclusão</DialogTitle>
                                                                <DialogDescription>
                                                                    Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => setDeleteExpenseId(null)}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={() => handleDelete(expense.id)}
                                                                    disabled={deleteMutation.isPending}
                                                                >
                                                                    {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {data.pagination && (
                                <Pagination
                                    currentPage={data.pagination.page}
                                    totalPages={data.pagination.totalPages}
                                    pageSize={data.pagination.limit}
                                    totalItems={data.pagination.total}
                                    onPageChange={handlePageChange}
                                    onPageSizeChange={handlePageSizeChange}
                                />
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <ExpenseForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                expense={selectedExpense || undefined}
            />
        </div>
    );
};