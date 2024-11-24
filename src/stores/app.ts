import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  isDangerModeEnabled: boolean;
  setDangerModeEnabled: (v: boolean) => void;
  isEmulatorSupportEnabled: boolean;
  setEmulatorSupportEnabled: (v: boolean) => void;
  isSimulatorSupportEnabled: boolean;
  setSimulatorSupportEnabled: (v: boolean) => void;
  isInitialSettingsDone: boolean;
  setInitialSettingsDone: (v: boolean) => void;
}

export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      isDangerModeEnabled: false,
      setDangerModeEnabled: (v) => set({ isDangerModeEnabled: v }),
      isEmulatorSupportEnabled: true,
      setEmulatorSupportEnabled: (v) => set({ isEmulatorSupportEnabled: v }),
      isSimulatorSupportEnabled: true,
      setSimulatorSupportEnabled: (v) => set({ isSimulatorSupportEnabled: v }),
      isInitialSettingsDone: false,
      setInitialSettingsDone: (v) => set({ isInitialSettingsDone: v }),
    }),
    {
      name: "emu-app-storage",
    }
  )
);
