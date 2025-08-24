import { api } from './api';
import {
	Expense,
	ExpensesResponse,
	CreateExpenseRequest,
	UpdateExpenseRequest,
	ExpenseQuery,
	ExpensesSummary,
} from '@/types/expense.types';

export const expensesService = {
	getExpenses: async (query: ExpenseQuery = {}): Promise<ExpensesResponse> => {
		const response = await api.get<ExpensesResponse>('/expenses', {
			params: query,
		});
		return response.data;
	},

	getExpense: async (id: string): Promise<Expense> => {
		const response = await api.get<Expense>(`/expenses/${id}`);
		return response.data;
	},

	createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
		const response = await api.post<Expense>('/expenses', data);
		return response.data;
	},

	updateExpense: async (
		id: string,
		data: UpdateExpenseRequest
	): Promise<Expense> => {
		const response = await api.patch<Expense>(`/expenses/${id}`, data);
		return response.data;
	},

	deleteExpense: async (id: string): Promise<void> => {
		await api.delete(`/expenses/${id}`);
	},

	getSummary: async (
		startDate?: string,
		endDate?: string
	): Promise<ExpensesSummary> => {
		const params = new URLSearchParams();
		if (startDate) params.append('startDate', startDate);
		if (endDate) params.append('endDate', endDate);

		const response = await api.get<ExpensesSummary>(
			`/expenses/summary?${params}`
		);
		return response.data;
	},
};
