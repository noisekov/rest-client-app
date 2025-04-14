import { create } from 'zustand';

interface clikedLinkInHistoryPageStore {
  indexLinkInHistoryPage: number | null;
  setIndexLinkInHistoryPage: (state: number) => void;
  clearIndex: () => void;
}

export const useClikedLinkStore = create<clikedLinkInHistoryPageStore>(
  (set) => ({
    indexLinkInHistoryPage: null,

    setIndexLinkInHistoryPage: (index) => {
      set((state) => ({
        indexLinkInHistoryPage: (state.indexLinkInHistoryPage = index),
      }));
    },

    clearIndex: () => {
      set((state) => ({
        indexLinkInHistoryPage: (state.indexLinkInHistoryPage = null),
      }));
    },
  })
);
