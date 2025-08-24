import { Category } from './category.types';
import { ExpensesSummary, Expense } from './expense.types';

export interface MonthlyReport {
	period: {
		month: number;
		year: number;
		startDate: string;
		endDate: string;
	};
	summary: ExpensesSummary;
	expenses: Expense[];
	totalTransactions: number;
}

export interface YearlyReport {
	year: number;
	summary: ExpensesSummary;
	monthlyData: {
		month: number;
		monthName: string;
		totalIncome: number;
		totalExpenses: number;
		balance: number;
		expensesByCategory: {
			category: Category;
			total: number;
			count: number;
		}[];
	}[];
}

export interface ExportCSVData {
	date: string;
	description: string;
	amount: number;
	type: string;
	category: string;
}
