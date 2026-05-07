import { create } from 'zustand';
import type { PermissionRequest, PermissionGrant } from '@/lib/contracts/types';
import { permissionsAdapter } from '@/lib/adapters/permissionsAdapter';

interface PermissionsState {
  activeRequests: PermissionRequest[];
  grantedPermissions: PermissionGrant[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addPermissionRequest: (request: PermissionRequest) => void;
  removePermissionRequest: (requestId: string) => void;
  grantPermission: (appId: string, permissionId: string) => Promise<void>;
  revokePermission: (appId: string, permissionId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
  activeRequests: [],
  grantedPermissions: [],
  isLoading: false,
  error: null,

  addPermissionRequest: (request: PermissionRequest) => {
    set((state) => ({
      activeRequests: [...state.activeRequests, request],
    }));
  },

  removePermissionRequest: (requestId: string) => {
    set((state) => ({
      activeRequests: state.activeRequests.filter((r) => r.id !== requestId),
    }));
  },

  grantPermission: async (appId: string, permissionId: string) => {
    set({ isLoading: true, error: null });
    try {
      await permissionsAdapter.grantPermission(appId, permissionId);
      set((state) => ({
        grantedPermissions: [
          ...state.grantedPermissions,
          {
            id: `${appId}-${permissionId}`,
            appId,
            permissionId,
            grantedAt: Date.now(),
            persistent: true,
          },
        ],
        isLoading: false,
      }));
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  revokePermission: async (appId: string, permissionId: string) => {
    set({ isLoading: true, error: null });
    try {
      await permissionsAdapter.revokePermission(appId, permissionId);
      set((state) => ({
        grantedPermissions: state.grantedPermissions.filter(
          (p) => !(p.appId === appId && p.permissionId === permissionId)
        ),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: String(err), isLoading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
}));
