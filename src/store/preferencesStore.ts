import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppPreferences } from '@/types/common.types';

interface PreferencesState extends AppPreferences {
	setPreference: <K extends keyof AppPreferences>(
		key: K,
		value: AppPreferences[K]
	) => void;
	resetPreferences: () => void;
}

const defaultPreferences: AppPreferences = {
	theme: 'light',
	currency: 'BRL',
	dateFormat: 'dd/MM/yyyy',
	defaultView: 'dashboard',
};

export const usePreferencesStore = create<PreferencesState>()(
	persist(
		(set) => ({
			...defaultPreferences,
			setPreference: (key, value) => set({ [key]: value }),
			resetPreferences: () => set(defaultPreferences),
		}),
		{
			name: 'preferences-storage',
		}
	)
);
