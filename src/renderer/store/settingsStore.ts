import { create } from 'zustand';
import { Theme, type UserSettings } from '@/lib/contracts/types';
import { settingsAdapter } from '@/lib/adapters/settingsAdapter';

interface SettingsState extends UserSettings {
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSettings: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  setHomepage: (homepage: string) => Promise<void>;
  toggleExperimentalFeatures: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: Theme.DARK,
  homepage: 'about:home',
  experimentalFeatures: false,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const settings = await settingsAdapter.getSettings();
      set({
        theme: settings.theme || Theme.DARK,
        homepage: settings.homepage || 'about:home',
        experimentalFeatures: settings.experimentalFeatures || false,
        isLoading: false,
      });
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  setTheme: async (theme: Theme) => {
    set({ isLoading: true, error: null });
    try {
      await settingsAdapter.updateSettings({ theme });
      set({ theme, isLoading: false });
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  setHomepage: async (homepage: string) => {
    set({ isLoading: true, error: null });
    try {
      await settingsAdapter.updateSettings({ homepage });
      set({ homepage, isLoading: false });
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  toggleExperimentalFeatures: async () => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        experimentalFeatures: !state.experimentalFeatures,
      }));
      // Optimistic update, then sync with adapter
      const current = await settingsAdapter.getSettings();
      await settingsAdapter.updateSettings({
        experimentalFeatures: !current.experimentalFeatures,
      });
    } catch (err) {
      set({ error: String(err) });
    } finally {
      set({ isLoading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
}));
