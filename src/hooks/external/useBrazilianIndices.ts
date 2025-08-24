import { useQuery } from '@tanstack/react-query';
import { externalService } from '@/services/external.service';

export const useBrazilianIndices = () => {
	return useQuery({
		queryKey: ['brazilian-indices'],
		queryFn: externalService.getBrazilianIndices,
		refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
	});
};
