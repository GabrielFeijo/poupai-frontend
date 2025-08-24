import { Bitcoin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCryptoPrices } from '@/hooks/external/useCryptoPrices';
import { formatNumber } from '@/lib/formatters';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const CryptoPricesCard = () => {
    const { data: cryptos, isLoading, error } = useCryptoPrices();

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (error || !cryptos) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bitcoin className="h-5 w-5" />
                        Criptomoedas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Erro ao carregar preços de criptomoedas</p>
                </CardContent>
            </Card>
        );
    }

    const coins = [
        { code: 'BTC', name: 'Bitcoin', usd: cryptos.bitcoin.usd, brl: cryptos.bitcoin.brl },
        { code: 'ETH', name: 'Ethereum', usd: cryptos.ethereum.usd, brl: cryptos.ethereum.brl },
        { code: 'LTC', name: 'Litecoin', usd: cryptos.litecoin.usd, brl: cryptos.litecoin.brl },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5" />
                    Criptomoedas
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Última atualização: {cryptos.lastUpdate}
                </p>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {coins.map((coin) => (
                        <div
                            key={coin.code}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                            <div>
                                <p className="font-medium">{coin.code}</p>
                                <p className="text-sm text-muted-foreground">{coin.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">US$ {formatNumber(coin.usd)}</p>
                                <p className="text-sm text-muted-foreground">
                                    R$ {formatNumber(coin.brl, 'pt-BR').replace(/\./g, ',')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
