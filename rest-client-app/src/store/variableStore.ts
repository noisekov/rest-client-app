import { create } from 'zustand';

type Variables = Record<string, string>;

interface VariableStore {
  variables: Variables;
  loading: boolean;
  loadVariables: (uid: string) => void;
  addVariable: (uid: string, key: string, value: string) => void;
  deleteVariable: (uid: string, key: string) => void;
}

export const useVariableStore = create<VariableStore>((set, get) => ({
  variables: {},
  loading: true,

  loadVariables: (uid) => {
    const stored = localStorage.getItem(`variables_${uid}`);
    const parsed = stored ? JSON.parse(stored) : {};

    set({ variables: parsed, loading: false });
  },

  addVariable: (uid, key, value) => {
    const current = get().variables;
    const updated = { ...current, [key]: value };

    localStorage.setItem(`variables_${uid}`, JSON.stringify(updated));
    set({ variables: updated });
  },

  deleteVariable: (uid, key) => {
    const current = get().variables;
    const updated = { ...current };
    delete updated[key];

    localStorage.setItem(`variables_${uid}`, JSON.stringify(updated));
    set({ variables: updated });
  },
}));
