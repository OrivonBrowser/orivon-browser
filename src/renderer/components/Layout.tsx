import React from 'react';
import { NavControls } from './NavControls';
import { UrlBar } from './UrlBar';
import { TabBar } from './TabBar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="header">
        <TabBar />
        <div className="address-bar">
          <NavControls />
          <UrlBar />
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
