import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '@/types/common.types';

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: 'light',
			setTheme: (theme) => {
				set({ theme });
				document.documentElement.classList.toggle('dark', theme === 'dark');
			},
			toggleTheme: () => {
				const newTheme = get().theme === 'light' ? 'dark' : 'light';
				get().setTheme(newTheme);
			},
		}),
		{
			name: 'theme-storage',
		}
	)
);
