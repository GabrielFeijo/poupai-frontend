import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { useExpenses } from "@/hooks/expenses/useExpenses";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ExpenseType } from "@/types/expense.types";
import { useThemeStore } from "@/store/themeStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const ExpenseChart = () => {
    const { data: expensesData, isLoading } = useExpenses({
        limit: 30,
        type: ExpenseType.EXPENSE,
    });
    const { theme } = useThemeStore();

    const textColor = theme === "dark" ? "#d1d5db" : "#111827";
    const gridColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const tooltipBg = theme === "dark" ? "#374151" : "#fff";
    const tooltipTitleColor = theme === "dark" ? "#f9fafb" : "#111827";
    const tooltipBodyColor = theme === "dark" ? "#f9fafb" : "#111827";

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (!expensesData?.expenses.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Evolução das Despesas</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Nenhuma despesa encontrada</p>
                </CardContent>
            </Card>
        );
    }

    const expensesByDate = expensesData.expenses.reduce((acc, expense) => {
        const date = formatDate(expense.date, "yyyy-MM-dd");
        if (!acc[date]) acc[date] = 0;
        acc[date] += expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(expensesByDate)
        .map(([date, amount]) => ({
            date: formatDate(date, "dd/MM"),
            amount,
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-14);

    const data = {
        labels: chartData.map((d) => d.date),
        datasets: [
            {
                label: "Despesas",
                data: chartData.map((d) => d.amount),
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.3)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#ef4444",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: tooltipBg,
                titleColor: tooltipTitleColor,
                bodyColor: tooltipBodyColor,
                callbacks: {
                    label: (context: any) => formatCurrency(context.raw),
                },
            },
        },
        scales: {
            x: {
                grid: { color: gridColor, display: true },
                ticks: { color: textColor },
            },
            y: {
                grid: { color: gridColor },
                ticks: {
                    color: textColor,
                    callback: (value: number | string) =>
                        typeof value === "number" ? formatCurrency(value) : value,
                },
            },
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Evolução das Despesas (últimos 14 dias)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <Line data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};
