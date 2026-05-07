import { describe, it, expect } from 'vitest';
import type { AppManifest, Permission, TrustScore } from '@/lib/contracts/types';
import { TrustLevel, PermissionRisk, Theme } from '@/lib/contracts/types';

describe('Contracts - Types', () => {
  it('should define TrustLevel enum', () => {
    expect(TrustLevel.VERIFIED).toBe('verified');
    expect(TrustLevel.KNOWN).toBe('known');
    expect(TrustLevel.UNKNOWN).toBe('unknown');
    expect(TrustLevel.RISKY).toBe('risky');
  });

  it('should define PermissionRisk enum', () => {
    expect(PermissionRisk.LOW).toBe('low');
    expect(PermissionRisk.MEDIUM).toBe('medium');
    expect(PermissionRisk.HIGH).toBe('high');
    expect(PermissionRisk.CRITICAL).toBe('critical');
  });

  it('should define Theme enum', () => {
    expect(Theme.LIGHT).toBe('light');
    expect(Theme.DARK).toBe('dark');
    expect(Theme.AUTO).toBe('auto');
  });

  it('should create valid Permission objects', () => {
    const permission: Permission = {
      id: 'read-wallet',
      name: 'read_wallet_address',
      description: 'Read your wallet address',
      risk: PermissionRisk.LOW,
    };

    expect(permission.id).toBe('read-wallet');
    expect(permission.risk).toBe('low');
  });

  it('should create valid AppManifest objects', () => {
    const manifest: AppManifest = {
      id: 'app-1',
      name: 'TestApp',
      version: '1.0.0',
      description: 'A test app',
      requiredPermissions: [],
      optionalPermissions: [],
      installed: false,
    };

    expect(manifest.id).toBe('app-1');
    expect(manifest.installed).toBe(false);
  });

  it('should create valid TrustScore objects', () => {
    const score: TrustScore = {
      level: TrustLevel.VERIFIED,
      score: 95,
      reason: 'Verified contract',
      updatedAt: Date.now(),
    };

    expect(score.level).toBe('verified');
    expect(score.score).toBe(95);
  });
});
