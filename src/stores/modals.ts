import { create } from "zustand";

interface ModalsStore {
  isAndroidHomeModalVisible: boolean;
  setAndroidHomeModalVisible: (v: boolean) => void;
  androidHomeModalError: string | null;
  setAndroidHomeModalError: (v: string | null) => void;
  isEmulatorOptionsModalVisible: boolean;
  setEmulatorOptionsModalVisible: (v: boolean) => void;
  emulatorOptionsName: string | null;
  setEmulatorOptionsName: (v: string | null) => void;
}

export const useModalsStore = create<ModalsStore>((set) => ({
  isAndroidHomeModalVisible: false,
  setAndroidHomeModalVisible: (v) => set({ isAndroidHomeModalVisible: v }),
  androidHomeModalError: null,
  setAndroidHomeModalError: (v) => set({ androidHomeModalError: v }),
  isEmulatorOptionsModalVisible: false,
  setEmulatorOptionsModalVisible: (v) =>
    set({ isEmulatorOptionsModalVisible: v }),
  emulatorOptionsName: null,
  setEmulatorOptionsName: (v) => set({ emulatorOptionsName: v }),
}));
