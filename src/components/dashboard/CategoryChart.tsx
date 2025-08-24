import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import { useExpensesSummary } from '@/hooks/expenses/useExpensesSummary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useThemeStore } from '@/store/themeStore';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChart = () => {
	const { data: summary, isLoading } = useExpensesSummary();
	const { theme } = useThemeStore();

	const legendColor = theme === 'dark' ? '#d1d5db' : '#6b7280';
	const tooltipBgColor = theme === 'dark' ? '#374151' : '#fff';
	const tooltipTitleColor = theme === 'dark' ? '#f9fafb' : '#111827';
	const tooltipLabelColor = theme === 'dark' ? '#f9fafb' : '#111827';

	if (isLoading) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center p-6">
					<LoadingSpinner />
				</CardContent>
			</Card>
		);
	}

	if (!summary?.expensesByCategory.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Despesas por Categoria</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">Nenhuma despesa encontrada</p>
				</CardContent>
			</Card>
		);
	}

	const filteredCategories = summary.expensesByCategory.filter((item) => item.total > 0).slice(0, 5);

	const chartData: ChartData<'pie'> = {
		labels: filteredCategories.map((item) => item.category.name),
		datasets: [
			{
				data: filteredCategories.map((item) => item.total),
				backgroundColor: filteredCategories.map((item) => item.category.color || '#8884d8'),
				borderColor: theme === 'dark' ? '#111827' : '#fff',
				borderWidth: 2,
			},
		],
	};

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					color: legendColor,
					font: { size: 12 },
				},
			},
			tooltip: {
				backgroundColor: tooltipBgColor,
				titleColor: tooltipTitleColor,
				bodyColor: tooltipLabelColor,
				callbacks: {
					label: (context) =>
						`${context.label}: ${formatCurrency(context.raw as number)}`,
				},
			},
		},
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Despesas por Categoria</CardTitle>
			</CardHeader>
			<CardContent className='w-full flex items-center flex-1 justify-center py-0'>
				<div className='h-[300px]'>
					<Pie data={chartData} options={options} height={300} />
				</div>
			</CardContent>
		</Card>
	);
};
