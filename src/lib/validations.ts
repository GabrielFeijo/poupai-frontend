import { z } from 'zod';
import { ExpenseType } from '@/types/expense.types';

export const loginSchema = z.object({
	email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z.object({
	name: z
		.string()
		.min(2, 'Nome deve ter pelo menos 2 caracteres')
		.max(50, 'Nome deve ter no máximo 50 caracteres'),
	email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
	password: z
		.string()
		.min(6, 'Senha deve ter pelo menos 6 caracteres')
		.max(100, 'Senha deve ter no máximo 100 caracteres'),
});

export const expenseSchema = z.object({
	description: z
		.string()
		.min(1, 'Descrição é obrigatória')
		.max(200, 'Descrição deve ter no máximo 200 caracteres'),
	amount: z
		.number()
		.positive('Valor deve ser positivo')
		.min(0.01, 'Valor mínimo é R$ 0,01'),
	date: z.string().min(1, 'Data é obrigatória'),
	type: z.nativeEnum(ExpenseType, {
		errorMap: () => ({ message: 'Tipo deve ser INCOME ou EXPENSE' }),
	}),
	categoryId: z.string().min(1, 'Categoria é obrigatória'),
});

export const categorySchema = z.object({
	name: z
		.string()
		.min(1, 'Nome é obrigatório')
		.max(50, 'Nome deve ter no máximo 50 caracteres'),
	color: z
		.string()
		.min(1, 'Cor é obrigatória')
		.regex(
			/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			'Cor deve ser um código hexadecimal válido'
		),
	description: z
		.string()
		.max(200, 'Descrição deve ter no máximo 200 caracteres')
		.optional(),
});

export const expenseFilterSchema = z.object({
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	categoryId: z.string().optional(),
	type: z.nativeEnum(ExpenseType).optional(),
	minAmount: z.number().min(0).optional(),
	maxAmount: z.number().min(0).optional(),
	search: z.string().optional(),
});

export const dateRangeSchema = z
	.object({
		startDate: z.date(),
		endDate: z.date(),
	})
	.refine((data) => data.startDate <= data.endDate, {
		message: 'Data inicial deve ser menor ou igual à data final',
		path: ['endDate'],
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type ExpenseFilterData = z.infer<typeof expenseFilterSchema>;
export type DateRangeData = z.infer<typeof dateRangeSchema>;
