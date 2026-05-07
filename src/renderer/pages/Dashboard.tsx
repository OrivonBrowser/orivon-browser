import React from 'react';
import { useAppsStore } from '@/renderer/store/appsStore';
import { useUi } from '@/renderer/context/UiContext';
import type { Page } from '../types.ts';
import './Dashboard.css';

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { installedApps, isLoading } = useAppsStore((state) => ({
    installedApps: state.installedApps,
    isLoading: state.isLoading,
  }));

  const { openSettingsModal } = useUi();

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome to Orivon Browser</h1>
          <p>A Web3-centric browser built for trustless browsing</p>
        </div>
        <button className="btn-settings" onClick={openSettingsModal} title="Settings">
          ⚙️ Settings
        </button>
      </div>

      <div className="dashboard-section">
        <h2>Installed Apps</h2>
        {installedApps.length === 0 ? (
          <p className="empty-state">No apps installed yet</p>
        ) : (
          <div className="app-grid">
            {installedApps.map((app) => (
              <div key={app.id} className="app-card">
                <div className="app-icon">{app.icon || '📦'}</div>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <button className="btn-primary" onClick={() => onNavigate?.('browser')}>
                  Open App
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Quick Shortcuts</h2>
        <div className="shortcuts">
          <button className="shortcut-btn" onClick={openSettingsModal}>
            <span className="shortcut-icon">⚙️</span>
            <span>Settings</span>
          </button>
          <button className="shortcut-btn" onClick={() => onNavigate?.('browser')}>
            <span className="shortcut-icon">🌐</span>
            <span>Browser</span>
          </button>
          <button className="shortcut-btn">
            <span className="shortcut-icon">🔒</span>
            <span>Permissions</span>
          </button>
          <button className="shortcut-btn">
            <span className="shortcut-icon">📊</span>
            <span>Trust Score</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
