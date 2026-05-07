import { create } from 'zustand';
import type { BrowserTab, NavigationState } from '@/lib/contracts/types';

interface NavigationStore extends NavigationState {
  // Actions
  addTab: () => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTab: (tabId: string, updates: Partial<BrowserTab>) => void;
  navigate: (url: string) => void;
  goBack: () => void;
  goForward: () => void;
}

// Helper to generate unique IDs
const generateTabId = () => `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useNavigationStore = create<NavigationStore>((set) => {
  // Create initial tab
  const initialTabId = generateTabId();

  return {
    activeTabId: initialTabId,
    tabs: [
      {
        id: initialTabId,
        title: 'New Tab',
        url: 'about:home',
        isLoading: false,
        canGoBack: false,
        canGoForward: false,
      },
    ],
    history: [],
    historyIndex: -1,

    addTab: () => {
      const newTabId = generateTabId();
      const newTab: BrowserTab = {
        id: newTabId,
        title: 'New Tab',
        url: 'about:home',
        isLoading: false,
        canGoBack: false,
        canGoForward: false,
      };

      set((state) => ({
        tabs: [...state.tabs, newTab],
        activeTabId: newTabId,
      }));
    },

    closeTab: (tabId: string) => {
      set((state) => {
        const newTabs = state.tabs.filter((t) => t.id !== tabId);
        if (newTabs.length === 0) {
          // If all tabs closed, create a new one
          const fallbackTabId = generateTabId();
          return {
            tabs: [
              {
                id: fallbackTabId,
                title: 'New Tab',
                url: 'about:home',
                isLoading: false,
                canGoBack: false,
                canGoForward: false,
              },
            ],
            activeTabId: fallbackTabId,
          };
        }

        let newActiveTabId = state.activeTabId;
        if (state.activeTabId === tabId) {
          newActiveTabId = newTabs[newTabs.length - 1].id;
        }

        return {
          tabs: newTabs,
          activeTabId: newActiveTabId,
        };
      });
    },

    setActiveTab: (tabId: string) => {
      set({ activeTabId: tabId });
    },

    updateTab: (tabId: string, updates: Partial<BrowserTab>) => {
      set((state) => ({
        tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, ...updates } : t)),
      }));
    },

    navigate: (url: string) => {
      set((state) => ({
        tabs: state.tabs.map((t) =>
          t.id === state.activeTabId
            ? {
                ...t,
                url,
                title: url,
                isLoading: true,
              }
            : t
        ),
      }));
    },

    goBack: () => {
      set((state) => ({
        historyIndex: Math.max(state.historyIndex - 1, 0),
      }));
    },

    goForward: () => {
      set((state) => ({
        historyIndex: Math.min(state.historyIndex + 1, state.history.length - 1),
      }));
    },
  };
});
