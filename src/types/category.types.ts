export interface Category {
	id: string;
	name: string;
	color: string;
	description?: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	_count: {
		expenses: number;
	};
}

export interface CategoryWithStats extends Category {
	totalExpenses: number;
	totalIncome: number;
	netAmount: number;
}

export interface CreateCategoryRequest {
	name: string;
	color: string;
	description?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}
