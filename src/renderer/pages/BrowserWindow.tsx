import React from 'react';
import Layout from '@/renderer/components/Layout';
import type { Page } from '../types.ts';
import './BrowserWindow.css';

interface BrowserWindowProps {
  onNavigate?: (page: Page) => void;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({ onNavigate }) => {
  return (
    <Layout>
      <div className="browser-content">
        <div className="placeholder">
          <div className="placeholder-icon">🌐</div>
          <h2>Browser Content Area</h2>
          <p>Runtime integration required to load web content</p>
          <button onClick={() => onNavigate?.('dashboard')} className="btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BrowserWindow;
