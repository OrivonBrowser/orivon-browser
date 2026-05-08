import { PermissionRisk, TrustLevel, type InstalledApp, type AppManifest } from '@/lib/contracts/types';
import type { IAppsAdapter } from './types';

/**
 * Mock implementation of IAppsAdapter
 * Returns static test data for UI development
 * In production, this will be replaced with IPC-based implementation
 */

const MOCK_INSTALLED_APPS: InstalledApp[] = [
  {
    id: 'app-1',
    name: 'UniSwap',
    version: '1.0.0',
    description: 'Decentralized token exchange protocol',
    icon: '🔄',
    author: 'Uniswap Labs',
    homepage: 'https://uniswap.org',
    requiredPermissions: [
      {
        id: 'read-wallet',
        name: 'read_wallet_address',
        description: 'Read your wallet address',
        risk: PermissionRisk.LOW,
      },
    ],
    optionalPermissions: [
      {
        id: 'sign-transaction',
        name: 'sign_transaction',
        description: 'Sign transactions',
        risk: PermissionRisk.HIGH,
      },
    ],
    trust: {
      level: TrustLevel.VERIFIED,
      score: 95,
      reason: 'Verified smart contract',
      updatedAt: Date.now(),
    },
    installed: true,
    installedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    permissions: [
      {
        id: 'perm-1',
        appId: 'app-1',
        permissionId: 'read-wallet',
        grantedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        persistent: true,
      },
    ],
    enabled: true,
    status: 'active',
    badges: ['verified'],
  },
  {
    id: 'app-2',
    name: 'Aave',
    version: '2.0.0',
    description: 'Lending and borrowing protocol',
    icon: '💰',
    author: 'Aave Labs',
    homepage: 'https://aave.com',
    requiredPermissions: [],
    optionalPermissions: [
      {
        id: 'read-balances',
        name: 'read_balances',
        description: 'Read token balances',
        risk: PermissionRisk.MEDIUM,
      },
    ],
    trust: {
      level: TrustLevel.VERIFIED,
      score: 98,
      reason: 'Verified smart contract',
      updatedAt: Date.now(),
    },
    installed: true,
    installedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    permissions: [],
    enabled: true,
    status: 'active',
    badges: ['verified'],
  },
  {
    id: 'app-3',
    name: 'OpenSea',
    version: '1.5.0',
    description: 'NFT marketplace for minting and trading',
    icon: '🎨',
    author: 'OpenSea',
    homepage: 'https://opensea.io',
    requiredPermissions: [],
    optionalPermissions: [],
    trust: {
      level: TrustLevel.KNOWN,
      score: 85,
      reason: 'Community-verified',
      updatedAt: Date.now(),
    },
    installed: true,
    installedAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
    permissions: [],
    enabled: true,
    status: 'active',
    badges: ['trusted'],
  },
];

const MOCK_AVAILABLE_APPS: AppManifest[] = [
  {
    id: 'app-4',
    name: 'Lido',
    version: '1.0.0',
    description: 'Liquid staking protocol for Ethereum',
    icon: '🔗',
    author: 'Lido',
    homepage: 'https://lido.fi',
    requiredPermissions: [],
    optionalPermissions: [],
    trust: {
      level: TrustLevel.VERIFIED,
      score: 92,
      reason: 'Verified smart contract',
      updatedAt: Date.now(),
    },
    installed: false,
  },
  {
    id: 'app-5',
    name: 'Curve',
    version: '1.0.0',
    description: 'Stablecoin DEX',
    icon: '〰️',
    author: 'Curve Labs',
    homepage: 'https://curve.fi',
    requiredPermissions: [],
    optionalPermissions: [],
    trust: {
      level: TrustLevel.VERIFIED,
      score: 94,
      reason: 'Verified smart contract',
      updatedAt: Date.now(),
    },
    installed: false,
  },
];

export const appsAdapter: IAppsAdapter = {
  async getInstalledApps(): Promise<InstalledApp[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_INSTALLED_APPS;
  },

  async getAvailableApps(): Promise<AppManifest[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_AVAILABLE_APPS;
  },

  async installApp(appId: string): Promise<InstalledApp> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const availableApp = MOCK_AVAILABLE_APPS.find((app) => app.id === appId);
    if (!availableApp) {
      throw new Error(`App ${appId} not found`);
    }

    const installedApp: InstalledApp = {
      ...availableApp,
      installed: true,
      installedAt: Date.now(),
      permissions: [],
      enabled: true,
      status: 'active',
      badges: [],
    };

    MOCK_INSTALLED_APPS.push(installedApp);
    return installedApp;
  },

  async uninstallApp(appId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = MOCK_INSTALLED_APPS.findIndex((app) => app.id === appId);
    if (index >= 0) {
      MOCK_INSTALLED_APPS.splice(index, 1);
    }
  },
};
