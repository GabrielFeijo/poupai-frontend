import { api } from './api';
import {
	Category,
	CategoryWithStats,
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from '@/types/category.types';

export const categoriesService = {
	getCategories: async (): Promise<Category[]> => {
		const response = await api.get<Category[]>('/categories');
		return response.data;
	},

	getCategory: async (id: string): Promise<Category> => {
		const response = await api.get<Category>(`/categories/${id}`);
		return response.data;
	},

	getCategoriesWithStats: async (): Promise<CategoryWithStats[]> => {
		const response = await api.get<CategoryWithStats[]>('/categories/stats');
		return response.data;
	},

	createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
		const response = await api.post<Category>('/categories', data);
		return response.data;
	},

	updateCategory: async (
		id: string,
		data: UpdateCategoryRequest
	): Promise<Category> => {
		const response = await api.patch<Category>(`/categories/${id}`, data);
		return response.data;
	},

	deleteCategory: async (id: string): Promise<void> => {
		await api.delete(`/categories/${id}`);
	},
};
