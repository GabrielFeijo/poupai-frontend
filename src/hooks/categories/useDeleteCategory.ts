import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { categoriesService } from '@/services/categories.service';

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => categoriesService.deleteCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			queryClient.invalidateQueries({ queryKey: ['categories-stats'] });
			toast.success('Categoria excluída com sucesso!');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Erro ao excluir categoria');
		},
	});
};
