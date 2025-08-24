import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { expensesService } from '@/services/expenses.service';
import { UpdateExpenseRequest } from '@/types/expense.types';

export const useUpdateExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateExpenseRequest }) =>
			expensesService.updateExpense(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
			queryClient.invalidateQueries({ queryKey: ['expenses-summary'] });
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Despesa atualizada com sucesso!');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao atualizar despesa');
		},
	});
};
