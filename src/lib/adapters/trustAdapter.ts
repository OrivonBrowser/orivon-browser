import { TrustLevel, type TrustScore } from '@/lib/contracts/types';
import type { ITrustAdapter } from './types';

/**
 * Mock implementation of ITrustAdapter
 */

const MOCK_TRUST_SCORES: Record<string, TrustScore> = {
  'app-1': { level: TrustLevel.VERIFIED, score: 95, updatedAt: Date.now() },
  'app-2': { level: TrustLevel.VERIFIED, score: 98, updatedAt: Date.now() },
  'app-3': { level: TrustLevel.KNOWN, score: 85, updatedAt: Date.now() },
  'app-4': { level: TrustLevel.VERIFIED, score: 92, updatedAt: Date.now() },
  'app-5': { level: TrustLevel.VERIFIED, score: 94, updatedAt: Date.now() },
};

export const trustAdapter: ITrustAdapter = {
  async getTrustScore(appId: string): Promise<TrustScore> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_TRUST_SCORES[appId] || { level: TrustLevel.UNKNOWN, score: 0, updatedAt: Date.now() };
  },
};
