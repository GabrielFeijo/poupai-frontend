import { CurrencyRates } from '@/components/external/CurrencyRates';
import { CryptoPricesCard } from '@/components/external/CryptoPricesCard';

export const ExternalDataPage = () => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <CurrencyRates />
                <CryptoPricesCard />
            </div>
        </div>
    );
};