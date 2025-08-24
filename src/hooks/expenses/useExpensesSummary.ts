import { useQuery } from '@tanstack/react-query';
import { expensesService } from '@/services/expenses.service';

export const useExpensesSummary = (startDate?: string, endDate?: string) => {
	return useQuery({
		queryKey: ['expenses-summary', startDate, endDate],
		queryFn: () => expensesService.getSummary(startDate, endDate),
	});
};
