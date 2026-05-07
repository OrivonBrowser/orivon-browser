import { contextBridge, ipcRenderer } from 'electron';
import type { IPCResponse } from '@/lib/contracts/types';

// Expose safe APIs to renderer process
contextBridge.exposeInMainWorld('api', {
  // App Management
  getInstalledApps: async (): Promise<IPCResponse> => {
    return ipcRenderer.invoke('get_installed_apps');
  },

  // Settings
  getSettings: async (): Promise<IPCResponse> => {
    return ipcRenderer.invoke('get_settings');
  },

  updateSettings: async (settings: unknown): Promise<IPCResponse> => {
    return ipcRenderer.invoke('update_settings', settings);
  },

  // Permissions
  requestPermission: async (request: unknown): Promise<IPCResponse> => {
    return ipcRenderer.invoke('request_permission', request);
  },

  // Trust & Safety
  getTrustScore: async (appId: string): Promise<IPCResponse> => {
    return ipcRenderer.invoke('get_trust_score', appId);
  },
});

declare global {
  interface Window {
    api: {
      getInstalledApps: () => Promise<IPCResponse>;
      getSettings: () => Promise<IPCResponse>;
      updateSettings: (settings: unknown) => Promise<IPCResponse>;
      requestPermission: (request: unknown) => Promise<IPCResponse>;
      getTrustScore: (appId: string) => Promise<IPCResponse>;
    };
  }
}
