export interface CurrencyRates {
	base: string;
	date: string;
	rates: {
		BRL: number;
		EUR: number;
		GBP: number;
		JPY: number;
	};
}

export interface BrazilianIndices {
	ibovespa: {
		value: number;
		change: number;
		changePercent: number;
		lastUpdate: string;
	};
	cdi: {
		value: number;
		annualRate: number;
		lastUpdate: string;
	};
	ipca: {
		monthly: number;
		yearly: number;
		lastUpdate: string;
	};
	selic: {
		value: number;
		lastUpdate: string;
	};
}

export interface CryptoPrices {
	bitcoin: {
		usd: number;
		brl: number;
	};
	ethereum: {
		usd: number;
		brl: number;
	};
	litecoin: {
		usd: number;
		brl: number;
	};
	lastUpdate: string;
}

export interface FinancialNews {
	title: string;
	summary: string;
	source: string;
	publishedAt: string;
	url: string;
}
