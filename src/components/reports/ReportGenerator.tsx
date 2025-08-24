import React from 'react';
import { BarChart3, Download, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMonthlyReport } from '@/hooks/reports/useMonthlyReport';
import { useYearlyReport } from '@/hooks/reports/useYearlyReport';
import { useExportCSV, useExportPDF } from '@/hooks/reports/useExportReport';
import { formatCurrency } from '@/lib/formatters';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const ReportGenerator = () => {
    const [reportType, setReportType] = React.useState<'monthly' | 'yearly'>('monthly');
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth() + 1);
    const [exportDateRange, setExportDateRange] = React.useState({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });

    const monthlyReport = useMonthlyReport(
        reportType === 'monthly' ? selectedYear : 0,
        reportType === 'monthly' ? selectedMonth : 0
    );

    const yearlyReport = useYearlyReport(
        reportType === 'yearly' ? selectedYear : 0
    );

    const exportCSVMutation = useExportCSV();
    const exportPDFMutation = useExportPDF();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' },
    ];

    const handleExportCSV = () => {
        exportCSVMutation.mutate(exportDateRange);
    };

    const handleExportPDF = () => {
        exportPDFMutation.mutate(exportDateRange);
    };

    const isLoading = monthlyReport.isLoading || yearlyReport.isLoading;
    const currentReport = reportType === 'monthly' ? monthlyReport.data : yearlyReport.data;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Gerar Relatório
                    </CardTitle>
                    <CardDescription>
                        Selecione o tipo de relatório e período desejado
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>Tipo de Relatório</Label>
                            <Select value={reportType} onValueChange={(value: 'monthly' | 'yearly') => setReportType(value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Mensal</SelectItem>
                                    <SelectItem value="yearly">Anual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Ano</Label>
                            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {reportType === 'monthly' && (
                            <div className="space-y-2">
                                <Label>Mês</Label>
                                <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((month) => (
                                            <SelectItem key={month.value} value={month.value.toString()}>
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {isLoading ? (
                <Card>
                    <CardContent className="flex items-center justify-center p-8">
                        <LoadingSpinner />
                    </CardContent>
                </Card>
            ) : currentReport ? (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Relatório {reportType === 'monthly' ? 'Mensal' : 'Anual'} - {selectedYear}
                            {reportType === 'monthly' && ` - ${months.find(m => m.value === selectedMonth)?.label}`}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                                Total Receitas
                                            </p>
                                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                                {formatCurrency(currentReport.summary.totalIncome)}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-200 dark:bg-green-800/50 rounded-full">
                                            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-red-700 dark:text-red-300">
                                                Total Despesas
                                            </p>
                                            <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                                                {formatCurrency(currentReport.summary.totalExpenses)}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-red-200 dark:bg-red-800/50 rounded-full">
                                            <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400 rotate-180" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className={`bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20
                                     ${currentReport.summary.balance >= 0 ? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' : 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
                                }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p
                                                className={`text-sm font-medium text-green-700 dark:text-green-300
                                                ${currentReport.summary.balance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}
                                            >
                                                Saldo
                                            </p>
                                            <p
                                                className={`text-2xl font-bold 
                                                ${currentReport.summary.balance >= 0 ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}
                                            >
                                                {formatCurrency(currentReport.summary.balance)}
                                            </p>
                                        </div>
                                        <div
                                            className={`p-3 rounded-full 
                                                ${currentReport.summary.balance >= 0 ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800/50'}`}
                                        >
                                            <TrendingUp
                                                className={`h-4 w-4 ${currentReport.summary.balance >= 0 ? 'text-green-600' : 'text-red-600 rotate-180'}`}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Despesas por Categoria</h3>
                            <div className="space-y-2">
                                {currentReport.summary.expensesByCategory.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="h-4 w-4 rounded-full"
                                                style={{ backgroundColor: item.category.color }}
                                            />
                                            <span className="font-medium">{item.category.name}</span>
                                            <span className="text-sm text-muted-foreground">({item.count} transações)</span>
                                        </div>
                                        <span className="font-semibold text-red-600">
                                            {formatCurrency(item.total)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {'monthlyData' in currentReport && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Evolução Mensal</h3>
                                <div className="grid gap-3">
                                    {currentReport.monthlyData.map((monthData) => (
                                        <div key={monthData.month} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                            <span className="font-medium capitalize">{monthData.monthName}</span>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-green-600">
                                                    +{formatCurrency(monthData.totalIncome)}
                                                </span>
                                                <span className="text-red-600">
                                                    -{formatCurrency(monthData.totalExpenses)}
                                                </span>
                                                <span className={`font-semibold ${monthData.balance >= 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {formatCurrency(monthData.balance)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : null
            }

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Exportar Dados
                    </CardTitle>
                    <CardDescription>
                        Exporte seus dados financeiros em formato CSV ou PDF
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Data Inicial</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={exportDateRange.startDate}
                                onChange={(e) => setExportDateRange({
                                    ...exportDateRange,
                                    startDate: e.target.value
                                })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">Data Final</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={exportDateRange.endDate}
                                onChange={(e) => setExportDateRange({
                                    ...exportDateRange,
                                    endDate: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={handleExportCSV}
                            disabled={exportCSVMutation.isPending}
                            variant="outline"
                        >
                            {exportCSVMutation.isPending ? (
                                <LoadingSpinner size="sm" className="mr-2" />
                            ) : (
                                <Download className="h-4 w-4 mr-2" />
                            )}
                            Exportar CSV
                        </Button>

                        <Button
                            onClick={handleExportPDF}
                            disabled={exportPDFMutation.isPending}
                            variant="outline"
                        >
                            {exportPDFMutation.isPending ? (
                                <LoadingSpinner size="sm" className="mr-2" />
                            ) : (
                                <Download className="h-4 w-4 mr-2" />
                            )}
                            Exportar PDF
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
};