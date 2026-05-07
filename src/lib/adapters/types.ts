import type { InstalledApp, Permission, AppManifest, TrustScore, UserSettings } from '@/lib/contracts/types';

export interface IAppsAdapter {
  getInstalledApps(): Promise<InstalledApp[]>;
  getAvailableApps(): Promise<AppManifest[]>;
  installApp(appId: string): Promise<InstalledApp>;
  uninstallApp(appId: string): Promise<void>;
}

export interface IPermissionsAdapter {
  getPermissions(appId: string): Promise<Permission[]>;
  grantPermission(appId: string, permissionId: string): Promise<void>;
  revokePermission(appId: string, permissionId: string): Promise<void>;
}

export interface ISettingsAdapter {
  getSettings(): Promise<UserSettings>;
  updateSettings(settings: Partial<UserSettings>): Promise<void>;
}

export interface ITrustAdapter {
  getTrustScore(appId: string): Promise<TrustScore>;
}
