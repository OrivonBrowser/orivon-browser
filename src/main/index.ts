import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { PermissionRisk, TrustLevel, Theme } from '@/lib/contracts/types';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../../assets/icon.png'),
  });

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../renderer/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// App lifecycle
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ============================================================================
// IPC Handlers (Mock implementations for now)
// ============================================================================

// App Management
ipcMain.handle('get_installed_apps', async () => {
  return {
    success: true,
    data: [
      {
        id: 'app-1',
        name: 'UniSwap',
        version: '1.0.0',
        description: 'Decentralized token exchange',
        icon: '🔄',
        author: 'UniSwap Team',
        requiredPermissions: [
          { id: 'read-wallet', name: 'read_wallet_address', description: 'Read your wallet address', risk: PermissionRisk.LOW },
        ],
        optionalPermissions: [],
        installed: true,
        installedAt: Date.now(),
        permissions: [],
        enabled: true,
      },
      {
        id: 'app-2',
        name: 'Aave',
        version: '1.0.0',
        description: 'Lending and borrowing protocol',
        icon: '💰',
        author: 'Aave Labs',
        requiredPermissions: [],
        optionalPermissions: [],
        installed: true,
        installedAt: Date.now(),
        permissions: [],
        enabled: true,
      },
      {
        id: 'app-3',
        name: 'OpenSea',
        version: '1.0.0',
        description: 'NFT marketplace',
        icon: '🎨',
        author: 'OpenSea',
        requiredPermissions: [],
        optionalPermissions: [],
        installed: true,
        installedAt: Date.now(),
        permissions: [],
        enabled: true,
      },
    ],
  };
});

ipcMain.handle('get_settings', async () => {
  return {
    success: true,
    data: {
      theme: Theme.DARK,
      homepage: 'about:home',
      experimentalFeatures: false,
    },
  };
});

ipcMain.handle('update_settings', async (_event, settings) => {
  // Mock: just return success
  return {
    success: true,
    data: settings,
  };
});

ipcMain.handle('request_permission', async (_event, _request) => {
  // Mock: permissions are always granted in mock mode
  return {
    success: true,
    data: { granted: true },
  };
});

ipcMain.handle('get_trust_score', async (_event, _appId) => {
  return {
    success: true,
    data: {
      level: TrustLevel.VERIFIED,
      score: 95,
      reason: 'Verified contract',
      updatedAt: Date.now(),
    },
  };
});

console.log('Electron main process running');
