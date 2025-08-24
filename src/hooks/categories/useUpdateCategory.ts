import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { categoriesService } from '@/services/categories.service';
import { UpdateCategoryRequest } from '@/types/category.types';

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
			categoriesService.updateCategory(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			queryClient.invalidateQueries({ queryKey: ['categories-stats'] });
			toast.success('Categoria atualizada com sucesso!');
		},
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message || 'Erro ao atualizar categoria'
			);
		},
	});
};
