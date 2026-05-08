import React from 'react';
import { useAppsStore } from '@/renderer/store/appsStore';
import { useUi } from '@/renderer/context/UiContext';
import type { Page } from '../types.ts';
import './Dashboard.css';

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

interface DashboardAppCard {
  id: string;
  name: string;
  status: 'green' | 'yellow';
  iconClass: string;
  icon: React.ReactNode;
  tags: Array<{ label: string; tone: 'teal' | 'purple' | 'blue' | 'gray' | 'green' }>;
}

const dashboardApps: DashboardAppCard[] = [
  {
    id: 'bisq.web3',
    name: 'bisq.web3',
    status: 'green',
    iconClass: 'icon-bisq',
    icon: <span className="app-icon-letter">B</span>,
    tags: [{ label: 'IPFS', tone: 'teal' }],
  },
  {
    id: 'orivon-stack',
    name: 'Orivon Stack',
    status: 'green',
    iconClass: 'icon-orivon',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="14" stroke="white" strokeWidth="3.5" fill="none" />
      </svg>
    ),
    tags: [{ label: 'https://orivonstack.eth', tone: 'green' }],
  },
  {
    id: 'runbitcoin-node',
    name: 'runbitcoin node',
    status: 'green',
    iconClass: 'icon-bitcoin',
    icon: <span className="app-icon-letter">₿</span>,
    tags: [
      { label: 'IPFS', tone: 'teal' },
      { label: 'IDOC', tone: 'purple' },
    ],
  },
  {
    id: 'maker-dao',
    name: 'Maker.DAO',
    status: 'green',
    iconClass: 'icon-maker',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path
          d="M8 26V12l10 8 10-8v14"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    tags: [{ label: 'DDOC', tone: 'blue' }],
  },
  {
    id: 'mastodon-x',
    name: 'mastodon.x',
    status: 'yellow',
    iconClass: 'icon-mastodon',
    icon: <span className="app-icon-letter">m</span>,
    tags: [{ label: 'Storj', tone: 'blue' }],
  },
  {
    id: 'ants-nft',
    name: 'Ants NFT',
    status: 'green',
    iconClass: 'icon-ants',
    icon: <span className="app-icon-emoji">🐜</span>,
    tags: [{ label: 'DDOC', tone: 'blue' }],
  },
  {
    id: 'uniswap-1',
    name: 'Uniswap.eth',
    status: 'green',
    iconClass: 'icon-uniswap1',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polygon points="16,4 28,26 4,26" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
        <polygon points="16,10 24,24 8,24" fill="rgba(255,255,255,0.25)" />
      </svg>
    ),
    tags: [{ label: 'IPFS', tone: 'teal' }],
  },
  {
    id: 'uniswap-2',
    name: 'Uniswap.eth',
    status: 'green',
    iconClass: 'icon-uniswap2',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path d="M17 4 L30 28 L4 28 Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
    tags: [{ label: 'IPFS', tone: 'teal' }],
  },
  {
    id: 'coingecko',
    name: 'CoinGecko.com',
    status: 'yellow',
    iconClass: 'icon-coingecko',
    icon: <span className="app-icon-emoji">🦎</span>,
    tags: [{ label: 'ICP', tone: 'gray' }],
  },
  {
    id: 'youtube',
    name: 'youtube.com',
    status: 'yellow',
    iconClass: 'icon-youtube',
    icon: (
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
        <rect width="36" height="28" rx="6" fill="transparent" />
        <polygon points="14,8 28,14 14,20" fill="white" />
      </svg>
    ),
    tags: [{ label: 'ICP', tone: 'gray' }],
  },
];

const trustlessNodes = [
  {
    id: 'bitcoin-pruned',
    name: 'Bitcoin Pruned',
    network: '(IPFS)',
    subLabel: 'IPFS',
    statusTone: 'green' as const,
    icon: '₿',
    iconClass: 'btc',
    actionLabel: 'ON',
    active: true,
  },
  {
    id: 'ethereum-light',
    name: 'Ethereum Light',
    network: '(Arweave)',
    subLabel: 'IPFS',
    statusTone: 'green' as const,
    icon: 'Ξ',
    iconClass: 'eth',
    actionLabel: 'ON',
    active: true,
  },
  {
    id: 'monero-pruned',
    name: 'Monero Pruned',
    network: '',
    subLabel: 'OFF',
    statusTone: 'gray' as const,
    icon: 'XMR',
    iconClass: 'xmr',
    actionLabel: 'Start Node',
    active: false,
  },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { installedApps, isLoading } = useAppsStore((state) => ({
    installedApps: state.installedApps,
    isLoading: state.isLoading,
  }));

  const { openSettingsModal } = useUi();

  if (isLoading) {
    return (
      <div className="dashboard-shell">
        <div className="dashboard-loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <main className="dashboard-shell">
      <div className="browser-chrome">
        <div className="tab-bar">
          <div className="browser-logo">O</div>
          <div className="tab">
            <span className="tab-favicon" />
            dashboard.orivon
            <span className="tab-close">×</span>
          </div>
          <div className="tab-add">+</div>
          <div className="wallet-info">
            <div className="eth-badge">
              <span className="eth-dot" />
              <span>0.58 ETH</span>
              <span className="eth-value">$1,768.20</span>
            </div>
            <div className="nav-icons">
              <span>🔔</span>
              <span>≡</span>
            </div>
            <div className="avatar">OV</div>
          </div>
        </div>
        <div className="address-bar">
          <div className="nav-btns">
            <span>←</span>
            <span>→</span>
          </div>
          <div className="url-input">
            <div className="url-spinner" />
            dashboard.orivon
            <span className="web3-tag">Web3</span>
          </div>
          <div className="toolbar-icons">
            <span>🛡</span>
            <span>⬛</span>
            <button
              type="button"
              className="icon-button"
              title="Settings"
              aria-label="Settings"
              onClick={openSettingsModal}
            >
              ⚙
            </button>
            <span>≡</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="app-grid">
          {dashboardApps.map((app) => (
            <article
              key={app.id}
              className="app-card"
              onClick={() => onNavigate?.('browser')}
            >
              <div className={`status-dot ${app.status}`} />
              <div className={`app-icon ${app.iconClass}`}>
                {app.icon}
              </div>
              <div className="app-name">{app.name}</div>
              <div className="app-tags">
                {app.tags.map((tag) => (
                  <span key={`${app.id}-${tag.label}`} className="tag">
                    <span className={`tag-dot ${tag.tone}`} />
                    {tag.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="bottom-row">
          <section className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-icon bisq">
                  <span>B</span>
                </div>
                <span>
                  Bisq<sup>2</sup> easy
                </span>
              </div>
              <div className="panel-menu">···</div>
            </div>
            <div className="reload-title">Reload via Bank Transfer</div>
            <div className="currency-tabs">
              <div className="currency-tab">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                USDT
              </div>
              <div className="currency-tab">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8m-4-4h8" />
                </svg>
                EURC
              </div>
            </div>
            <div className="payment-logos">
              <span className="pay-logo sepa">SEPA</span>
              <span className="pay-divider" />
              <div className="payment-stack">
                <span className="payment-stack-title">SWIFT</span>
                <span className="payment-stack-copy">EU Internal<br />Bank transfer</span>
              </div>
              <span className="pay-divider" />
              <span className="pay-logo revolut">Revolut</span>
              <span className="pay-divider" />
              <span className="pay-logo wise">➤ Wise</span>
            </div>
            <div className="action-btns">
              <button type="button" className="btn btn-usdt">Reload USDT</button>
              <button type="button" className="btn btn-eurc">Reload EURC</button>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-icon nodes panel-icon-nodes">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1L10 4v4L6 11 2 8V4L6 1z" fill="#22c55e" />
                  </svg>
                </div>
                Trustless Nodes
              </div>
              <div className="panel-menu">···</div>
            </div>

            {trustlessNodes.map((node, index) => (
              <div
                key={node.id}
                className={`node-item ${index === 0 ? 'first' : ''} ${index === trustlessNodes.length - 1 ? 'last' : ''}`}
              >
                <div className={`node-logo ${node.iconClass}`}>{node.icon}</div>
                <div className="node-info">
                  <div className="node-name">
                    {node.name} {node.network && <span>{node.network}</span>}
                  </div>
                  <div className="node-sub">
                    <span className={`node-sub-dot ${node.statusTone}`} />
                    {node.subLabel}
                  </div>
                </div>
                <button type="button" className={`node-btn ${node.active ? 'on' : 'start'}`}>
                  {node.active ? (
                    <div className="node-btn-inner">
                      {node.actionLabel} <span className="on-indicator" />
                    </div>
                  ) : (
                    node.actionLabel
                  )}
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="sr-only">
        <h1>Welcome to Orivon Browser</h1>
        <section aria-label="Installed apps">
          {installedApps.map((app) => (
            <div key={app.id}>{app.name}</div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
