import useSWR from "swr";
import { Emulator, OnlineEmulator } from "@/types/emulator";
import { getAllEmulators, getOnlineEmulators } from "@/services/api/emulator";
import { invoke } from "@tauri-apps/api/core";
import { useModalsStore } from "@/stores/modals";
import { useAppStore } from "@/stores/app";

export const useEmulators = () => {
  const setAndroidHomeModalVisible = useModalsStore(
    (state) => state.setAndroidHomeModalVisible
  );
  const setAndroidHomeModalError = useModalsStore(
    (state) => state.setAndroidHomeModalError
  );

  return useSWR("emulators", async () => {
    try {
      await invoke<string>("get_android_home");
    } catch (error) {
      const { isDangerModeEnabled } = useAppStore.getState();
      if (!isDangerModeEnabled) setAndroidHomeModalVisible(true);

      if (typeof error === "string") setAndroidHomeModalError(error);
      else if (error instanceof Error) setAndroidHomeModalError(error.message);
      else setAndroidHomeModalError(JSON.stringify(error));

      return null;
    }

    const online = await getOnlineEmulators();

    const all = await getAllEmulators();

    const emulators: Record<string, Emulator | OnlineEmulator> = {};

    for (const name of all) {
      const onlineEmulator = online[name];
      emulators[name] = onlineEmulator || { name, state: "offline" };
    }

    return emulators;
  });
};
