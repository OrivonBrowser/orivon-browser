import React, { useState } from 'react';
import { useNavigationStore } from '@/renderer/store/navigationStore';
import './UrlBar.css';

export const UrlBar: React.FC = () => {
  const { activeTabId, tabs, navigate } = useNavigationStore((state) => ({
    activeTabId: state.activeTabId,
    tabs: state.tabs,
    navigate: state.navigate,
  }));

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const [inputValue, setInputValue] = useState(activeTab?.url || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let url = inputValue.trim();
      // Simple URL validation: if no protocol, assume http
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:')) {
        url = `https://${url}`;
      }
      navigate(url);
    }
  };

  return (
    <div className="url-bar">
      <input
        type="text"
        className="url-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter URL or search..."
      />
    </div>
  );
};

export default UrlBar;
