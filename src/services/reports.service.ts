import { api } from './api';
import { MonthlyReport, YearlyReport } from '@/types/report.types';

export const reportsService = {
	getMonthlyReport: async (
		year: number,
		month: number
	): Promise<MonthlyReport> => {
		const response = await api.get<MonthlyReport>('/reports/monthly', {
			params: { year, month },
		});
		return response.data;
	},

	getYearlyReport: async (year: number): Promise<YearlyReport> => {
		const response = await api.get<YearlyReport>('/reports/yearly', {
			params: { year },
		});
		return response.data;
	},

	exportCSV: async (startDate: string, endDate: string): Promise<Blob> => {
		const response = await api.get('/reports/export/csv', {
			params: { startDate, endDate },
			responseType: 'blob',
		});
		return response.data;
	},

	exportPDF: async (startDate: string, endDate: string): Promise<Blob> => {
		const response = await api.get('/reports/export/pdf', {
			params: { startDate, endDate },
			responseType: 'blob',
		});
		return response.data;
	},
};
