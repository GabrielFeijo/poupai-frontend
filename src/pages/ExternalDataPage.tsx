import { CurrencyRates } from '@/components/external/CurrencyRates';
import { BrazilianIndices } from '@/components/external/BrazilianIndices';

export const ExternalDataPage = () => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <CurrencyRates />
                <BrazilianIndices />
            </div>
        </div>
    );
};