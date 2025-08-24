import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBrazilianIndices } from '@/hooks/external/useBrazilianIndices';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const BrazilianIndices = () => {
    const { data: indices, isLoading, error } = useBrazilianIndices();

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (error || !indices) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Índices Brasileiros
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Erro ao carregar índices</p>
                </CardContent>
            </Card>
        );
    }

    const indexData = [
        {
            name: 'IBOVESPA',
            value: formatNumber(indices.ibovespa.value),
            change: indices.ibovespa.change,
            changePercent: indices.ibovespa.changePercent,
            unit: 'pts',
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Índices Brasileiros
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {indexData.map((index) => (
                        <div
                            key={index.name}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                            <div>
                                <p className="font-medium">{index.name}</p>
                                <p className="text-sm text-muted-foreground">{index.unit}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{index.value}</p>
                                {index.change !== null && (
                                    <div className={`flex items-center gap-1 text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {index.change >= 0 ? (
                                            <TrendingUp className="h-3 w-3" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3" />
                                        )}
                                        {formatPercent(index.changePercent || 0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
