import { create } from 'zustand';

interface clikedLinkInHistoryPageStore {
  indexLinkInHistoryPage: number;
  handleClick: (state: number) => void;
}

export const useClikedLinkStore = create<clikedLinkInHistoryPageStore>(
  (set) => ({
    indexLinkInHistoryPage: 0,

    handleClick: (index) => {
      set((state) => ({
        indexLinkInHistoryPage: (state.indexLinkInHistoryPage = index),
      }));
    },
  })
);
