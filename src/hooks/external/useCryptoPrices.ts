import { useQuery } from '@tanstack/react-query';
import { externalService } from '@/services/external.service';

export const useCryptoPrices = () => {
	return useQuery({
		queryKey: ['crypto-prices'],
		queryFn: externalService.getCryptoPrices,
		refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
	});
};
