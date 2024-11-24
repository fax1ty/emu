import { invoke } from "@tauri-apps/api/core";
import useSWR, { useSWRConfig } from "swr";

import { getAllEmulators, getOnlineEmulators } from "@/services/api/emulator";
import { useAppStore } from "@/stores/app";
import { useModalsStore } from "@/stores/modals";
import { Device } from "@/types/device";

export const useEmulators = () => {
  const isAndroidHomeModalVisible = useModalsStore(
    (state) => state.isAndroidHomeModalVisible
  );
  const setAndroidHomeModalVisible = useModalsStore(
    (state) => state.setAndroidHomeModalVisible
  );
  const setAndroidHomeModalError = useModalsStore(
    (state) => state.setAndroidHomeModalError
  );
  const isEmulatorSupportEnabled = useAppStore(
    (state) => state.isEmulatorSupportEnabled
  );
  const isInitialSettingsDone = useAppStore(
    (state) => state.isInitialSettingsDone
  );

  const disabled =
    isAndroidHomeModalVisible ||
    !isInitialSettingsDone ||
    !isEmulatorSupportEnabled;

  const { cache } = useSWRConfig();

  return useSWR(
    disabled ? null : "emulators",
    async () => {
      try {
        await invoke<string>("get_android_home");
      } catch (error) {
        const { isDangerModeEnabled } = useAppStore.getState();
        if (!isDangerModeEnabled) setAndroidHomeModalVisible(true);

        if (typeof error === "string") setAndroidHomeModalError(error);
        else if (error instanceof Error)
          setAndroidHomeModalError(error.message);
        else setAndroidHomeModalError(JSON.stringify(error));

        return null;
      }

      const cached = cache.get("emulators");

      const online = await getOnlineEmulators();

      const all = await getAllEmulators();

      const emulators: Record<string, Device> = {};

      for (const name of all) {
        const cachedEmulator = cached?.data?.[name] as Device;
        const onlineEmulator = online[name];
        emulators[name] = onlineEmulator || {
          ...cachedEmulator,
          name,
          state: "offline",
          os: "android",
        };
      }

      return emulators;
    },
    { refreshInterval: 5 * 1000 }
  );
};
