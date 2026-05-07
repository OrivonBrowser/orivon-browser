import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '@/renderer/pages/Dashboard';
import { UiProvider } from '@/renderer/context/UiContext';
import { Theme } from '@/lib/contracts/types';

// Mock the stores
vi.mock('@/renderer/store/appsStore', () => ({
  useAppsStore: vi.fn(() => ({
    installedApps: [
      {
        id: 'app-1',
        name: 'Test App',
        version: '1.0.0',
        description: 'A test app',
        icon: '📦',
        installed: true,
        requiredPermissions: [],
        permissions: [],
        enabled: true,
      },
    ],
    isLoading: false,
  })),
}));

vi.mock('@/renderer/store/settingsStore', () => ({
  useSettingsStore: vi.fn(() => ({
    theme: Theme.DARK,
    fetchSettings: vi.fn(),
  })),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render dashboard title', () => {
    render(
      <UiProvider>
        <Dashboard />
      </UiProvider>
    );

    expect(screen.getByText('Welcome to Orivon Browser')).toBeTruthy();
  });

  it('should display installed apps', () => {
    render(
      <UiProvider>
        <Dashboard />
      </UiProvider>
    );

    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('should display settings button', () => {
    render(
      <UiProvider>
        <Dashboard />
      </UiProvider>
    );

    const settingsBtn = screen.getByText(/Settings/i);
    expect(settingsBtn).toBeTruthy();
  });
});
