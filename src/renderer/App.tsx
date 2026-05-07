import { useEffect, useState } from 'react';
import { UiProvider } from './context/UiContext';
import { useSettingsStore } from './store/settingsStore';
import { useAppsStore } from './store/appsStore';
import Dashboard from './pages/Dashboard';
import BrowserWindow from './pages/BrowserWindow';
import SettingsModal from './components/SettingsModal';
import PermissionRequest from './components/PermissionRequest';
import type { Page } from './types.ts';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const { fetchSettings, theme } = useSettingsStore();
  const { fetchInstalledApps, fetchAvailableApps } = useAppsStore();

  useEffect(() => {
    // Initialize app state on mount
    fetchSettings();
    fetchInstalledApps();
    fetchAvailableApps();
  }, [fetchSettings, fetchInstalledApps, fetchAvailableApps]);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="app-container">
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'browser' && <BrowserWindow onNavigate={setCurrentPage} />}
      
      {/* Global Modals & Components */}
      <SettingsModal />
      <PermissionRequest />
    </div>
  );
}

function App() {
  return (
    <UiProvider>
      <AppContent />
    </UiProvider>
  );
}

export default App;
