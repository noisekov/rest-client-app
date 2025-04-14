import { create } from 'zustand';

interface clikedLinkInHistoryPageStore {
  indexLinkInHistoryPage: number | null;
  handleClick: (state: number) => void;
  clearIndex: () => void;
}

export const useClikedLinkStore = create<clikedLinkInHistoryPageStore>(
  (set) => ({
    indexLinkInHistoryPage: null,

    handleClick: (index) => {
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
