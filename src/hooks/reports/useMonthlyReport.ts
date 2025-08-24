import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reports.service';

export const useMonthlyReport = (year: number, month: number) => {
	return useQuery({
		queryKey: ['monthly-report', year, month],
		queryFn: () => reportsService.getMonthlyReport(year, month),
		enabled: !!year && !!month,
	});
};
