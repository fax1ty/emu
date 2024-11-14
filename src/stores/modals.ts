import { create } from "zustand";

interface ModalsStore {
  isAndroidHomeModalVisible: boolean;
  setAndroidHomeModalVisible: (v: boolean) => void;
  androidHomeModalError: string | null;
  setAndroidHomeModalError: (v: string | null) => void;
}

export const useModalsStore = create<ModalsStore>((set) => ({
  isAndroidHomeModalVisible: false,
  setAndroidHomeModalVisible: (v) => set({ isAndroidHomeModalVisible: v }),
  androidHomeModalError: null,
  setAndroidHomeModalError: (v) => set({ androidHomeModalError: v }),
}));
