export interface ApiError {
	message: string;
	statusCode: number;
	error?: string;
}

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface DateRange {
	startDate?: Date;
	endDate?: Date;
}

export type Theme = 'light' | 'dark';

export interface AppPreferences {
	theme: Theme;
	currency: string;
	dateFormat: string;
	defaultView: string;
}
