import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { expensesService } from '@/services/expenses.service';
import { CreateExpenseRequest } from '@/types/expense.types';

export const useCreateExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateExpenseRequest) =>
			expensesService.createExpense(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
			queryClient.invalidateQueries({ queryKey: ['expenses-summary'] });
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Despesa criada com sucesso!');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao criar despesa');
		},
	});
};
