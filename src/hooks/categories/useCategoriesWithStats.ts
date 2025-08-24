import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/services/categories.service';

export const useCategoriesWithStats = () => {
	return useQuery({
		queryKey: ['categories-stats'],
		queryFn: categoriesService.getCategoriesWithStats,
	});
};
