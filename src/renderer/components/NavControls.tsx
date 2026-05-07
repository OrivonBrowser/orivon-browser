import React from 'react';
import { useNavigationStore } from '@/renderer/store/navigationStore';
import './NavControls.css';

export const NavControls: React.FC = () => {
  const { goBack, goForward, navigate } = useNavigationStore((state) => ({
    goBack: state.goBack,
    goForward: state.goForward,
    navigate: state.navigate,
  }));

  const handleReload = () => {
    // TODO: Implement reload logic
    console.log('Reload clicked');
  };

  const handleHome = () => {
    navigate('about:home');
  };

  return (
    <div className="nav-controls">
      <button className="nav-btn" onClick={goBack} title="Go back">
        ← Back
      </button>
      <button className="nav-btn" onClick={goForward} title="Go forward">
        Forward →
      </button>
      <button className="nav-btn" onClick={handleReload} title="Reload">
        ⟳ Reload
      </button>
      <button className="nav-btn" onClick={handleHome} title="Go home">
        🏠 Home
      </button>
    </div>
  );
};

export default NavControls;
