import React from 'react';
import { useAppsStore } from '@/renderer/store/appsStore';
import { useUi } from '@/renderer/context/UiContext';
import type { Page } from '../types.ts';
import './Dashboard.css';

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

interface AppWithBadges extends Record<string, any> {
  id: string;
  name: string;
  icon: string;
  badges?: string[];
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

  // Enhanced app data with badges and metadata
  const enhancedApps = installedApps.map((app: AppWithBadges) => ({
    ...app,
    badges: app.badges || ['IPFS'],
    status: app.status || 'online',
  }));

  return (
    <div className="dashboard">
      {/* Header with Balance and Profile */}
      <div className="dashboard-top-header">
        <div className="balance-section">
          <div className="balance-item">
            <span className="balance-crypto">0.58 ETH</span>
            <span className="balance-fiat">$1,768.20</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-settings" onClick={openSettingsModal} title="Settings">
            ⚙️
          </button>
        </div>
      </div>

      {/* Main App Grid */}
      <div className="dashboard-content">
        <div className="app-grid">
          {enhancedApps.length === 0 ? (
            <p className="empty-state">No apps installed yet</p>
          ) : (
            enhancedApps.map((app: AppWithBadges) => (
              <div 
                key={app.id} 
                className="app-card"
                onClick={() => onNavigate?.('browser')}
              >
                <div className="app-card-status">
                  <div className={`status-dot ${app.status}`}></div>
                </div>
                <div className="app-card-icon">{app.icon || '📦'}</div>
                <h3 className="app-card-name">{app.name}</h3>
                <p className="app-card-url">{app.name.toLowerCase()}.com</p>
                <div className="app-card-badges">
                  {app.badges?.map((badge: string, idx: number) => (
                    <span key={idx} className="badge">{badge}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="dashboard-bottom">
        <div className="bottom-section">
          <div className="section-header">
            <h2>Bisq2 easy</h2>
            <button className="section-menu">⋯</button>
          </div>
          <div className="section-content">
            <p className="section-subtitle">Reload via Bank Transfer</p>
            <div className="bank-options">
              <div className="bank-logos">
                <span className="bank-logo">SEPA</span>
                <span className="bank-logo">SWIFT</span>
                <span className="bank-logo">EU Internal</span>
                <span className="bank-logo">Bank transfer</span>
                <span className="bank-logo">Revolut</span>
                <span className="bank-logo">WISE</span>
              </div>
              <div className="reload-buttons">
                <button className="btn-reload usdt">Reload USDT</button>
                <button className="btn-reload eurc">Reload EURC</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <div className="section-header">
            <h2>Trustless Nodes</h2>
            <button className="section-menu">⋯</button>
          </div>
          <div className="section-content">
            <div className="node-list">
              <div className="node-item">
                <div className="node-icon">₿</div>
                <div className="node-info">
                  <p className="node-name">Bitcoin Pruned</p>
                  <p className="node-type">(IPFS)</p>
                </div>
                <div className="node-status">
                  <span className="status-badge on">ON</span>
                  <span className="status-icon">✓</span>
                </div>
              </div>
              <div className="node-item">
                <div className="node-icon">◊</div>
                <div className="node-info">
                  <p className="node-name">Ethereum Light</p>
                  <p className="node-type">(Arweave)</p>
                </div>
                <div className="node-status">
                  <span className="status-badge on">ON</span>
                  <span className="status-icon">✓</span>
                </div>
              </div>
              <div className="node-item">
                <div className="node-icon">M</div>
                <div className="node-info">
                  <p className="node-name">Monero Pruned</p>
                </div>
                <div className="node-status">
                  <span className="status-badge off">OFF</span>
                  <button className="btn-start">Start Node</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
