import React from 'react';
import { Edit2, Trash2, Plus, Tags, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CategoryForm } from './CategoryForm';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useCategoriesWithStats } from '@/hooks/categories/useCategoriesWithStats';
import { useDeleteCategory } from '@/hooks/categories/useDeleteCategory';
import { formatCurrency } from '@/lib/formatters';
import { CategoryWithStats } from '@/types/category.types';

export const CategoriesList = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<CategoryWithStats | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [_, setDeleteCategoryId] = React.useState<string | null>(null);

    const { data: categories = [], isLoading, error } = useCategoriesWithStats();
    const deleteMutation = useDeleteCategory();

    const handleEdit = (category: CategoryWithStats) => {
        setSelectedCategory(category);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteMutation.mutateAsync(id);
        setDeleteCategoryId(null);
    };

    const handleNewCategory = () => {
        setSelectedCategory(null);
        setIsFormOpen(true);
    };

    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-destructive">Erro ao carregar categorias</p>
            </div>
        );
    }

    const totalExpenses = categories.reduce((acc, cat) => acc + cat.totalExpenses, 0);
    const totalIncome = categories.reduce((acc, cat) => acc + cat.totalIncome, 0);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                    Total de Categorias
                                </p>
                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                    {categories.length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-200 dark:bg-blue-800/50 rounded-full">
                                <Tags className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                    Total Receitas
                                </p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                    {formatCurrency(totalIncome)}
                                </p>
                            </div>
                            <div className="p-3 bg-green-200 dark:bg-green-800/50 rounded-full">
                                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                                    Total Despesas
                                </p>
                                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                                    {formatCurrency(totalExpenses)}
                                </p>
                            </div>
                            <div className="p-3 bg-red-200 dark:bg-red-800/50 rounded-full">
                                <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400 rotate-180" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className='flex justify-between flex-row'>
                    <CardTitle className="flex items-center gap-2">
                        <Tags className="h-5 w-5" />
                        Suas Categorias
                    </CardTitle>

                    <Button onClick={handleNewCategory} className="w-fit sm:w-auto text-sm">
                        <Plus className="h-3 w-3 sm:mr-2" />
                        <span className='hidden sm:inline'>Nova Categoria</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <LoadingSpinner />
                        </div>
                    ) : !categories.length ? (
                        <div className="text-center p-8">
                            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                <Tags className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Nenhuma categoria encontrada</h3>
                            <p className="text-muted-foreground mb-4">
                                Crie sua primeira categoria para organizar suas finanças
                            </p>
                            <Button onClick={handleNewCategory}>
                                <Plus className="h-4 w-4 mr-2" />
                                Criar Categoria
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => (
                                <Card key={category.id} className="group hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div
                                                    className="h-4 w-4 rounded-full flex-shrink-0 ring-1 ring-white dark:ring-gray-800"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-sm truncate">
                                                        {category.name}
                                                    </h3>
                                                    {category.description && (
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {category.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 w-7 p-0"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    <Edit2 className="h-3 w-3" />
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                                            onClick={() => setDeleteCategoryId(category.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Confirmar Exclusão</DialogTitle>
                                                            <DialogDescription>
                                                                Tem certeza que deseja excluir a categoria "{category.name}"?
                                                                {category._count.expenses > 0 && (
                                                                    <span className="text-amber-600 dark:text-amber-400">
                                                                        <br />
                                                                        Esta categoria possui {category._count.expenses} transação(ões) vinculada(s).
                                                                    </span>
                                                                )}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setDeleteCategoryId(null)}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => handleDelete(category.id)}
                                                                disabled={deleteMutation.isPending}
                                                            >
                                                                {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">Transações</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {category._count.expenses}
                                                </Badge>
                                            </div>

                                            {category.totalIncome > 0 && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-green-600 dark:text-green-400">
                                                        Receitas
                                                    </span>
                                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                                        {formatCurrency(category.totalIncome)}
                                                    </span>
                                                </div>
                                            )}

                                            {category.totalExpenses > 0 && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-red-600 dark:text-red-400">
                                                        Despesas
                                                    </span>
                                                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                                        {formatCurrency(category.totalExpenses)}
                                                    </span>
                                                </div>
                                            )}

                                            {category.netAmount !== 0 && (
                                                <div className="flex items-center justify-between pt-2 border-t">
                                                    <span className="text-xs font-medium">Saldo</span>
                                                    <span className={`text-xs font-semibold ${category.netAmount >= 0
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                        }`}>
                                                        {formatCurrency(category.netAmount)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <CategoryForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                category={selectedCategory || undefined}
            />
        </div>
    );
};