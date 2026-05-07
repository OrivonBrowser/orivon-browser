import { PermissionRisk, type Permission } from '@/lib/contracts/types';
import type { IPermissionsAdapter } from './types';

/**
 * Mock implementation of IPermissionsAdapter
 */

const MOCK_PERMISSIONS: Record<string, Permission[]> = {
  'app-1': [
    {
      id: 'read-wallet',
      name: 'read_wallet_address',
      description: 'Read your wallet address',
      risk: PermissionRisk.LOW,
    },
  ],
  'app-2': [
    {
      id: 'read-balances',
      name: 'read_balances',
      description: 'Read token balances',
      risk: PermissionRisk.MEDIUM,
    },
  ],
};

const GRANTED_PERMISSIONS: Record<string, string[]> = {
  'app-1': ['read-wallet'],
};

export const permissionsAdapter: IPermissionsAdapter = {
  async getPermissions(appId: string): Promise<Permission[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_PERMISSIONS[appId] || [];
  },

  async grantPermission(appId: string, permissionId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!GRANTED_PERMISSIONS[appId]) {
      GRANTED_PERMISSIONS[appId] = [];
    }

    if (!GRANTED_PERMISSIONS[appId].includes(permissionId)) {
      GRANTED_PERMISSIONS[appId].push(permissionId);
    }
  },

  async revokePermission(appId: string, permissionId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (GRANTED_PERMISSIONS[appId]) {
      GRANTED_PERMISSIONS[appId] = GRANTED_PERMISSIONS[appId].filter(
        (p) => p !== permissionId
      );
    }
  },
};
