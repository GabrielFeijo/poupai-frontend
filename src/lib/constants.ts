import { ExpenseType } from '@/types/expense.types';

export const APP_CONFIG = {
	name: 'PoupAí - Análise Financeira',
	version: '1.0.0',
	description: 'Sistema de Análise Financeira',
} as const;

export const ROUTES = {
	LOGIN: '/login',
	REGISTER: '/register',
	DASHBOARD: '/dashboard',
	EXPENSES: '/expenses',
	CATEGORIES: '/categories',
	REPORTS: '/reports',
	EXTERNAL_DATA: '/external-data',
	PROFILE: '/profile',
} as const;

export const EXPENSE_TYPES = {
	INCOME: {
		value: ExpenseType.INCOME,
		label: 'Receita',
		color: 'text-green-600',
		bgColor: 'bg-green-100',
	},
	EXPENSE: {
		value: ExpenseType.EXPENSE,
		label: 'Despesa',
		color: 'text-red-600',
		bgColor: 'bg-red-100',
	},
} as const;

export const DATE_FORMATS = {
	SHORT: 'dd/MM/yyyy',
	LONG: "dd 'de' MMMM 'de' yyyy",
	WITH_TIME: 'dd/MM/yyyy HH:mm',
	ISO: 'yyyy-MM-dd',
} as const;

export const COLORS = {
	PRIMARY: '#0ea5e9',
	SUCCESS: '#10b981',
	WARNING: '#f59e0b',
	ERROR: '#ef4444',
	INFO: '#3b82f6',
} as const;

export const DEFAULT_CATEGORY_COLORS = [
	'#ef4444', // red
	'#f97316', // orange
	'#f59e0b', // amber
	'#eab308', // yellow
	'#84cc16', // lime
	'#22c55e', // green
	'#10b981', // emerald
	'#14b8a6', // teal
	'#06b6d4', // cyan
	'#0ea5e9', // sky
	'#3b82f6', // blue
	'#6366f1', // indigo
	'#8b5cf6', // violet
	'#a855f7', // purple
	'#d946ef', // fuchsia
	'#ec4899', // pink
	'#f43f5e', // rose
] as const;

export const PAGINATION = {
	DEFAULT_PAGE_SIZE: 10,
	PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const QUERY_KEYS = {
	EXPENSES: 'expenses',
	EXPENSES_SUMMARY: 'expenses-summary',
	CATEGORIES: 'categories',
	CATEGORIES_STATS: 'categories-stats',
	MONTHLY_REPORT: 'monthly-report',
	YEARLY_REPORT: 'yearly-report',
	CURRENCY_RATES: 'currency-rates',
	BRAZILIAN_INDICES: 'brazilian-indices',
	CRYPTO_PRICES: 'crypto-prices',
	FINANCIAL_NEWS: 'financial-news',
	PROFILE: 'profile',
} as const;
