/**
 * Shared TypeScript contracts for Orivon Browser
 * These types define the shape of all major entities and are designed to integrate cleanly with the future Rust/C++ runtime
 */

// ============================================================================
// Trust & Safety
// ============================================================================

export enum TrustLevel {
  VERIFIED = 'verified',
  KNOWN = 'known',
  UNKNOWN = 'unknown',
  RISKY = 'risky',
}

export interface TrustScore {
  level: TrustLevel;
  score: number; // 0-100
  reason?: string;
  updatedAt: number; // timestamp
}

export enum PermissionRisk {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// ============================================================================
// Permissions & Security
// ============================================================================

export interface Permission {
  id: string;
  name: string; // e.g., 'read_wallet_address', 'sign_transaction'
  description: string;
  risk: PermissionRisk;
  scope?: string; // e.g., specific chain, contract, or resource
}

export interface PermissionRequest {
  id: string;
  appId: string;
  appName: string;
  appIcon?: string;
  permissions: Permission[];
  timestamp: number;
  context?: Record<string, unknown>; // Additional context for the request
}

export interface PermissionGrant {
  id: string;
  appId: string;
  permissionId: string;
  grantedAt: number;
  expiresAt?: number; // Optional: permission expiry
  persistent: boolean; // Whether user chose "remember this choice"
}

// ============================================================================
// Applications & Modules
// ============================================================================

export interface AppManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  icon?: string;
  author?: string;
  homepage?: string;
  requiredPermissions: Permission[];
  optionalPermissions?: Permission[];
  trust?: TrustScore;
  installed: boolean;
  installedAt?: number;
}

export interface ModuleMetadata {
  id: string;
  type: 'app' | 'plugin' | 'provider'; // Type of module
  name: string;
  version: string;
  checksum?: string; // For integrity verification
  dependencies?: string[]; // Module IDs this depends on
}

export interface InstalledApp extends AppManifest {
  status: string;
  badges: string[];
  installedAt: number;
  permissions: PermissionGrant[];
  enabled: boolean;
}

// ============================================================================
// Navigation & Browser State
// ============================================================================

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  icon?: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  error?: string;
}

export interface NavigationState {
  activeTabId: string;
  tabs: BrowserTab[];
  history: string[];
  historyIndex: number;
}

// ============================================================================
// Settings & User Preferences
// ============================================================================

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

export interface UserSettings {
  theme: Theme;
  homepage: string;
  defaultChain?: string; // For Web3 defaults
  experimentalFeatures: boolean;
  privacyMode?: boolean; // Future: privacy-focused mode
}

// ============================================================================
// Dashboard & UI State
// ============================================================================

export interface DashboardState {
  installedApps: InstalledApp[];
  suggestedApps: AppManifest[];
  recentApps: InstalledApp[];
  pinnedApps: string[]; // App IDs
}

export interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

// ============================================================================
// IPC Messages (Electron Main <-> Renderer Communication)
// ============================================================================

export interface IPCMessage {
  type: string;
  payload?: Record<string, unknown>;
}

export interface IPCResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Common IPC message types
export enum IPCMessageType {
  // App Management
  GET_INSTALLED_APPS = 'get_installed_apps',
  INSTALL_APP = 'install_app',
  UNINSTALL_APP = 'uninstall_app',

  // Permissions
  REQUEST_PERMISSION = 'request_permission',
  GRANT_PERMISSION = 'grant_permission',
  REVOKE_PERMISSION = 'revoke_permission',
  GET_PERMISSIONS = 'get_permissions',

  // Settings
  GET_SETTINGS = 'get_settings',
  UPDATE_SETTINGS = 'update_settings',

  // Navigation
  NAVIGATE = 'navigate',
  GO_BACK = 'go_back',
  GO_FORWARD = 'go_forward',

  // Trust & Safety
  GET_TRUST_SCORE = 'get_trust_score',
}

// ============================================================================
// Error Types
// ============================================================================

export enum ErrorCode {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  INVALID_APP = 'INVALID_APP',
  INSTALLATION_FAILED = 'INSTALLATION_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}
