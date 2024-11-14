import { create } from "zustand";

interface AppStore {
  isDangerModeEnabled: boolean;
  setDangerModeEnabled: (v: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isDangerModeEnabled: false,
  setDangerModeEnabled: (v) => set({ isDangerModeEnabled: v }),
}));
