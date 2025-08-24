import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { expenseFilterSchema, type ExpenseFilterData } from '@/lib/validations';
import { ExpenseQuery } from '@/types/expense.types';

interface ExpenseFilterProps {
    onFilter: (filters: ExpenseQuery) => void;
    initialFilters?: ExpenseQuery;
}

export const ExpenseFilter = ({ onFilter, initialFilters }: ExpenseFilterProps) => {
    const {
        register,
        handleSubmit,
        watch,
    } = useForm<ExpenseFilterData>({
        resolver: zodResolver(expenseFilterSchema),
        defaultValues: {
            search: initialFilters?.search || '',
        },
    });

    React.useEffect(() => {
        const subscription = watch((data) => {
            onFilter(data as ExpenseQuery);
        });
        return () => subscription.unsubscribe();
    }, [watch, onFilter]);

    const onSubmit = (data: ExpenseFilterData) => {
        onFilter(data as ExpenseQuery);
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por descrição..."
                    {...register('search')}
                    className="flex-1"
                />
            </div>
        </form>
    );
};