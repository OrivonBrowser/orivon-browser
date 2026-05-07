import React from 'react';
import { useNavigationStore } from '@/renderer/store/navigationStore';
import './TabBar.css';

export const TabBar: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, addTab, closeTab } = useNavigationStore(
    (state) => ({
      tabs: state.tabs,
      activeTabId: state.activeTabId,
      setActiveTab: state.setActiveTab,
      addTab: state.addTab,
      closeTab: state.closeTab,
    })
  );

  return (
    <div className="tab-bar">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-title">{tab.title || 'New Tab'}</span>
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              title="Close tab"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button className="add-tab-btn" onClick={addTab} title="Add new tab">
        +
      </button>
    </div>
  );
};

export default TabBar;
