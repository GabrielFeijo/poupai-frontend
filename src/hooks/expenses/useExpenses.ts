import { useQuery } from '@tanstack/react-query';
import { expensesService } from '@/services/expenses.service';
import { ExpenseQuery } from '@/types/expense.types';

export const useExpenses = (query: ExpenseQuery = {}) => {
	return useQuery({
		queryKey: ['expenses', query],
		queryFn: () => expensesService.getExpenses(query),
		// keepPreviousData: true,
	});
};
