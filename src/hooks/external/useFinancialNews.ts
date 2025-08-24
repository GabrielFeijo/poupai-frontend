import { useQuery } from '@tanstack/react-query';
import { externalService } from '@/services/external.service';

export const useFinancialNews = () => {
	return useQuery({
		queryKey: ['financial-news'],
		queryFn: externalService.getFinancialNews,
		refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
	});
};
