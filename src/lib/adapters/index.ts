/**
 * Adapter Factory
 * Provides dependency injection for adapter implementations
 * In production, adapters will be swapped from mock to IPC-based implementations
 */

import { appsAdapter } from './appsAdapter';
import { permissionsAdapter } from './permissionsAdapter';
import { settingsAdapter } from './settingsAdapter';
import { trustAdapter } from './trustAdapter';

import type { IAppsAdapter, IPermissionsAdapter, ISettingsAdapter, ITrustAdapter } from './types';

export interface IAdapters {
  apps: IAppsAdapter;
  permissions: IPermissionsAdapter;
  settings: ISettingsAdapter;
  trust: ITrustAdapter;
}

/**
 * Get all adapters
 * Currently returns mock implementations
 * Future: will conditionally return IPC-based implementations based on runtime availability
 */
export const getAdapters = (): IAdapters => ({
  apps: appsAdapter,
  permissions: permissionsAdapter,
  settings: settingsAdapter,
  trust: trustAdapter,
});

// Default export for convenience
export default getAdapters();

// Re-export individual adapters
export { appsAdapter, permissionsAdapter, settingsAdapter, trustAdapter };
export type { IAppsAdapter, IPermissionsAdapter, ISettingsAdapter, ITrustAdapter };
