import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { expensesService } from '@/services/expenses.service';

export const useDeleteExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => expensesService.deleteExpense(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
			queryClient.invalidateQueries({ queryKey: ['expenses-summary'] });
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Despesa excluída com sucesso!');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao excluir despesa');
		},
	});
};
