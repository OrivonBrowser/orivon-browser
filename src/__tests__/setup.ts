import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configure jsdom to avoid encoding-sniffer issues
if (typeof global !== 'undefined' && global.navigator) {
  Object.defineProperty(global.navigator, 'platform', {
    value: 'Node.js',
    writable: true,
  });
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.api (Electron preload)
Object.defineProperty(window, 'api', {
  value: {
    getInstalledApps: vi.fn(),
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
    requestPermission: vi.fn(),
    getTrustScore: vi.fn(),
  },
});
