import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatCurrency = (
	value: number,
	currency: string = 'BRL',
	locale: string = 'pt-BR'
): string => {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	}).format(value);
};

export const formatNumber = (
	value: number,
	locale: string = 'pt-BR'
): string => {
	return new Intl.NumberFormat(locale).format(value);
};

export const formatPercent = (
	value: number,
	locale: string = 'pt-BR'
): string => {
	return new Intl.NumberFormat(locale, {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value / 100);
};

export const formatDate = (
	date: string | Date,
	pattern: string = 'dd/MM/yyyy',
	locale = ptBR
): string => {
	try {
		const dateObj = typeof date === 'string' ? parseISO(date) : date;
		if (!isValid(dateObj)) return 'Data inválida';
		return format(dateObj, pattern, { locale });
	} catch {
		return 'Data inválida';
	}
};

export const formatDateTime = (
	date: string | Date,
	pattern: string = 'dd/MM/yyyy HH:mm',
	locale = ptBR
): string => {
	return formatDate(date, pattern, locale);
};

export const formatRelativeTime = (date: string | Date): string => {
	try {
		const dateObj = typeof date === 'string' ? parseISO(date) : date;
		if (!isValid(dateObj)) return 'Data inválida';

		const now = new Date();
		const diffInSeconds = Math.floor(
			(now.getTime() - dateObj.getTime()) / 1000
		);

		if (diffInSeconds < 60) return 'Agora';
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m atrás`;
		if (diffInSeconds < 86400)
			return `${Math.floor(diffInSeconds / 3600)}h atrás`;
		if (diffInSeconds < 2592000)
			return `${Math.floor(diffInSeconds / 86400)}d atrás`;

		return formatDate(dateObj);
	} catch {
		return 'Data inválida';
	}
};

export const parseCurrency = (value: string): number => {
	const cleaned = value.replace(/[^\d,.-]/g, '');
	const normalized = cleaned.replace(',', '.');
	return parseFloat(normalized) || 0;
};
