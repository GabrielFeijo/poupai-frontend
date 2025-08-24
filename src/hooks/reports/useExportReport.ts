import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reportsService } from '@/services/reports.service';

export const useExportCSV = () => {
	return useMutation({
		mutationFn: ({
			startDate,
			endDate,
		}: {
			startDate: string;
			endDate: string;
		}) => reportsService.exportCSV(startDate, endDate),
		onSuccess: (blob, variables) => {
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `financial_report_${variables.startDate}_${variables.endDate}.csv`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
			toast.success('Relatório CSV exportado com sucesso!');
		},
		onError: () => {
			toast.error('Erro ao exportar relatório CSV');
		},
	});
};

export const useExportPDF = () => {
	return useMutation({
		mutationFn: ({
			startDate,
			endDate,
		}: {
			startDate: string;
			endDate: string;
		}) => reportsService.exportPDF(startDate, endDate),
		onSuccess: (blob, variables) => {
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `financial_report_${variables.startDate}_${variables.endDate}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
			toast.success('Relatório PDF exportado com sucesso!');
		},
		onError: () => {
			toast.error('Erro ao exportar relatório PDF');
		},
	});
};
