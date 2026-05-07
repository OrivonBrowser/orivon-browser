import React from 'react';
import { useUi } from '@/renderer/context/UiContext';
import { useSettingsStore } from '@/renderer/store/settingsStore';
import { Theme } from '@/lib/contracts/types';
import './SettingsModal.css';

export const SettingsModal: React.FC = () => {
  const { isSettingsModalOpen, closeSettingsModal } = useUi();
  const { theme, setTheme, experimentalFeatures, toggleExperimentalFeatures } =
    useSettingsStore((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
      experimentalFeatures: state.experimentalFeatures,
      toggleExperimentalFeatures: state.toggleExperimentalFeatures,
    }));

  if (!isSettingsModalOpen) return null;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="modal-overlay" onClick={closeSettingsModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={closeSettingsModal}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <label htmlFor="theme-select">Theme:</label>
              <select
                id="theme-select"
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value as Theme)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Experimental Features</h3>
            <div className="setting-item">
              <label htmlFor="experimental-toggle">
                <input
                  id="experimental-toggle"
                  type="checkbox"
                  checked={experimentalFeatures}
                  onChange={() => toggleExperimentalFeatures()}
                />
                Enable experimental features
              </label>
              <p className="setting-hint">
                Experimental features may be unstable. Enable at your own risk.
              </p>
            </div>
          </div>

          <div className="settings-section">
            <h3>About</h3>
            <p>Orivon Browser v0.0.1</p>
            <p className="setting-hint">A Web3-centric, trustless browser</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={closeSettingsModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
