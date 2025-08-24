import { Category } from './category.types';

export enum ExpenseType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE',
}

export interface Expense {
	id: string;
	description: string;
	amount: number;
	date: string;
	type: ExpenseType;
	categoryId: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	category: Category;
}

export interface CreateExpenseRequest {
	description: string;
	amount: number;
	date: string;
	type: ExpenseType;
	categoryId: string;
}

export interface UpdateExpenseRequest extends Partial<CreateExpenseRequest> {}

export interface ExpenseQuery {
	page?: number;
	limit?: number;
	startDate?: string;
	endDate?: string;
	categoryId?: string;
	type?: ExpenseType;
	minAmount?: number;
	maxAmount?: number;
	search?: string;
}

export interface ExpensesResponse {
	expenses: Expense[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface ExpensesSummary {
	totalIncome: number;
	totalExpenses: number;
	balance: number;
	expensesByCategory: {
		category: Category;
		total: number;
		count: number;
	}[];
}
