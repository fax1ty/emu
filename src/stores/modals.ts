import { create } from "zustand";

import { Device } from "@/types/device";

interface ModalsStore {
  isAndroidHomeModalVisible: boolean;
  setAndroidHomeModalVisible: (v: boolean) => void;
  androidHomeModalError: string | null;
  setAndroidHomeModalError: (v: string | null) => void;
  isDeviceOptionsModalVisible: boolean;
  setDeviceOptionsModalVisible: (v: boolean) => void;
  deviceOptionsInfo: Device | null;
  setDeviceOptionsInfo: (v: Device | null) => void;
}

export const useModalsStore = create<ModalsStore>((set) => ({
  isAndroidHomeModalVisible: false,
  setAndroidHomeModalVisible: (v) => set({ isAndroidHomeModalVisible: v }),
  androidHomeModalError: null,
  setAndroidHomeModalError: (v) => set({ androidHomeModalError: v }),
  isDeviceOptionsModalVisible: false,
  setDeviceOptionsModalVisible: (v) => set({ isDeviceOptionsModalVisible: v }),
  deviceOptionsInfo: null,
  setDeviceOptionsInfo: (v) => set({ deviceOptionsInfo: v }),
}));
