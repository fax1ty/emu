import { create } from "zustand";

interface ModalsStore {
  isAndroidHomeModalVisible: boolean;
  setAndroidHomeModalVisible: (v: boolean) => void;
}

export const useModalsStore = create<ModalsStore>((set) => ({
  isAndroidHomeModalVisible: false,
  setAndroidHomeModalVisible: (v) => set({ isAndroidHomeModalVisible: v }),
}));
