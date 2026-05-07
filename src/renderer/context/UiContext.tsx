import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastNotification } from '@/lib/contracts/types';

interface UiContextValue {
  // Modal state
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;

  isPermissionModalOpen: boolean;
  openPermissionModal: () => void;
  closePermissionModal: () => void;

  isInstallPromptOpen: boolean;
  openInstallPrompt: () => void;
  closeInstallPrompt: () => void;

  // Toast notifications
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (toastId: string) => void;

  // Sidebar state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const UiContext = createContext<UiContextValue | undefined>(undefined);

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isInstallPromptOpen, setIsInstallPromptOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastNotification = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration
    if (newToast.duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const value: UiContextValue = {
    isSettingsModalOpen,
    openSettingsModal: () => setIsSettingsModalOpen(true),
    closeSettingsModal: () => setIsSettingsModalOpen(false),

    isPermissionModalOpen,
    openPermissionModal: () => setIsPermissionModalOpen(true),
    closePermissionModal: () => setIsPermissionModalOpen(false),

    isInstallPromptOpen,
    openInstallPrompt: () => setIsInstallPromptOpen(true),
    closeInstallPrompt: () => setIsInstallPromptOpen(false),

    toasts,
    addToast,
    removeToast,

    isSidebarOpen,
    toggleSidebar,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUi = (): UiContextValue => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within UiProvider');
  }
  return context;
};
