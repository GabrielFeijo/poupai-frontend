import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reports.service';

export const useYearlyReport = (year: number) => {
	return useQuery({
		queryKey: ['yearly-report', year],
		queryFn: () => reportsService.getYearlyReport(year),
		enabled: !!year,
	});
};
