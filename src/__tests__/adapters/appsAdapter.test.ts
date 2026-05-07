import { describe, it, expect } from 'vitest';
import { appsAdapter } from '@/lib/adapters/appsAdapter';

describe('appsAdapter', () => {
  it('should return installed apps', async () => {
    const apps = await appsAdapter.getInstalledApps();
    expect(apps.length).toBeGreaterThan(0);
    expect(apps[0]).toHaveProperty('id');
    expect(apps[0]).toHaveProperty('name');
  });

  it('should return available apps', async () => {
    const apps = await appsAdapter.getAvailableApps();
    expect(Array.isArray(apps)).toBe(true);
  });

  it('should install an app', async () => {
    const availableApps = await appsAdapter.getAvailableApps();
    if (availableApps.length > 0) {
      const appToInstall = availableApps[0];
      const installed = await appsAdapter.installApp(appToInstall.id);
      expect(installed.id).toBe(appToInstall.id);
      expect(installed.installed).toBe(true);
    }
  });

  it('should throw error when installing non-existent app', async () => {
    await expect(appsAdapter.installApp('non-existent-app')).rejects.toThrow();
  });
});
