import { create } from 'zustand';
import type { InstalledApp, AppManifest } from '@/lib/contracts/types';
import { appsAdapter } from '@/lib/adapters/appsAdapter';

interface AppsState {
  installedApps: InstalledApp[];
  availableApps: AppManifest[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchInstalledApps: () => Promise<void>;
  fetchAvailableApps: () => Promise<void>;
  installApp: (appId: string) => Promise<void>;
  uninstallApp: (appId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAppsStore = create<AppsState>((set) => ({
  installedApps: [],
  availableApps: [],
  isLoading: false,
  error: null,

  fetchInstalledApps: async () => {
    set({ isLoading: true, error: null });
    try {
      const apps = await appsAdapter.getInstalledApps();
      set({ installedApps: apps, isLoading: false });
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  fetchAvailableApps: async () => {
    set({ isLoading: true, error: null });
    try {
      const apps = await appsAdapter.getAvailableApps();
      set({ availableApps: apps, isLoading: false });
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  installApp: async (appId: string) => {
    set({ isLoading: true, error: null });
    try {
      const app = await appsAdapter.installApp(appId);
      set((state) => ({
        installedApps: [...state.installedApps, app],
        availableApps: state.availableApps.filter((a) => a.id !== appId),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  uninstallApp: async (appId: string) => {
    set({ isLoading: true, error: null });
    try {
      await appsAdapter.uninstallApp(appId);
      const uninstalledApp = await appsAdapter.getInstalledApps();
      const removedApp = uninstalledApp.find((a) => a.id === appId);

      set((state) => ({
        installedApps: state.installedApps.filter((a) => a.id !== appId),
        availableApps: removedApp
          ? [...state.availableApps, removedApp]
          : state.availableApps,
        isLoading: false,
      }));
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
}));
