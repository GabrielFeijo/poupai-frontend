import { api } from './api';
import {
	CurrencyRates,
	BrazilianIndices,
	CryptoPrices,
	FinancialNews,
} from '@/types/external.types';

export const externalService = {
	getCurrencyRates: async (): Promise<CurrencyRates> => {
		const response = await api.get<CurrencyRates>('/external-api/currencies');
		return response.data;
	},

	getBrazilianIndices: async (): Promise<BrazilianIndices> => {
		const response = await api.get<BrazilianIndices>('/external-api/indices');
		return response.data;
	},

	getCryptoPrices: async (): Promise<CryptoPrices> => {
		const response = await api.get<CryptoPrices>('/external-api/crypto');
		return response.data;
	},

	getFinancialNews: async (): Promise<FinancialNews[]> => {
		const response = await api.get<FinancialNews[]>('/external-api/news');
		return response.data;
	},
};
