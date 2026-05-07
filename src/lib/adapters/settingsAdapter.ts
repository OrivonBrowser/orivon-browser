import { Theme, type UserSettings } from '@/lib/contracts/types';
import type { ISettingsAdapter } from './types';

/**
 * Mock implementation of ISettingsAdapter
 */

let mockSettings: UserSettings = {
  theme: Theme.DARK,
  homepage: 'about:home',
  experimentalFeatures: false,
};

export const settingsAdapter: ISettingsAdapter = {
  async getSettings(): Promise<UserSettings> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockSettings;
  },

  async updateSettings(settings: Partial<UserSettings>): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    mockSettings = { ...mockSettings, ...settings };
  },
};
