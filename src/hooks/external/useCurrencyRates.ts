import { useQuery } from '@tanstack/react-query';
import { externalService } from '@/services/external.service';

export const useCurrencyRates = () => {
	return useQuery({
		queryKey: ['currency-rates'],
		queryFn: externalService.getCurrencyRates,
		refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
	});
};
