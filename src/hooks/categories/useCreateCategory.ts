import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { categoriesService } from '@/services/categories.service';
import { CreateCategoryRequest } from '@/types/category.types';

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCategoryRequest) =>
			categoriesService.createCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			queryClient.invalidateQueries({ queryKey: ['categories-stats'] });
			toast.success('Categoria criada com sucesso!');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao criar categoria');
		},
	});
};
