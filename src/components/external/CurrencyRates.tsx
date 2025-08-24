import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrencyRates } from '@/hooks/external/useCurrencyRates';
import { formatNumber } from '@/lib/formatters';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const CurrencyRates = () => {
    const { data: rates, isLoading, error } = useCurrencyRates();

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (error || !rates) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Cotações de Moedas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Erro ao carregar cotações</p>
                </CardContent>
            </Card>
        );
    }

    const currencies = [
        { code: 'BRL', name: 'Real Brasileiro', rate: rates.rates.BRL },
        { code: 'EUR', name: 'Euro', rate: rates.rates.EUR },
        { code: 'GBP', name: 'Libra Esterlina', rate: rates.rates.GBP },
        { code: 'JPY', name: 'Iene Japonês', rate: rates.rates.JPY },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Cotações de Moedas
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Base: {rates.base} • Atualizado em: {rates.date}
                </p>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {currencies.map((currency) => (
                        <div
                            key={currency.code}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                            <div>
                                <p className="font-medium">{currency.code}</p>
                                <p className="text-sm text-muted-foreground">{currency.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">
                                    {currency.code === 'JPY'
                                        ? formatNumber(currency.rate)
                                        : formatNumber(currency.rate, 'pt-BR').replace(/\./g, ',')
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
