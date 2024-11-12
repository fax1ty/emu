import useSWR from "swr";
import { Emulator, OnlineEmulator } from "@/types/emulator";
import { getAllEmulators, getOnlineEmulators } from "@/services/api/emulator";
import { invoke } from "@tauri-apps/api/core";
import { useModalsStore } from "@/stores/modals";

export const useEmulators = () => {
  const setAndroidHomeModalVisible = useModalsStore(
    (state) => state.setAndroidHomeModalVisible
  );

  return useSWR("emulators", async () => {
    try {
      await invoke<string>("get_android_home");
    } catch (error) {
      setAndroidHomeModalVisible(true);
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
