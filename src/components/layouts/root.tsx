import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { platform } from "@tauri-apps/plugin-os";

import { AhoyModal } from "@/components/modals/ahoy";
import { AndroidHomeModal } from "@/components/modals/android-home";
import { DeivceOptionsModal } from "@/components/modals/device-options";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app";
import { useModalsStore } from "@/stores/modals";

export const RootLayout = () => {
  const currentPlatfrom = useMemo(() => platform(), []);

  useEffect(() => {
    const {
      isInitialSettingsDone,
      setInitialSettingsDone,
      setSimulatorSupportEnabled,
    } = useAppStore.getState();
    const { setAhoyModalVisisble } = useModalsStore.getState();

    const currentPlatfrom = platform();

    if (currentPlatfrom === "windows") {
      setSimulatorSupportEnabled(false);
      setInitialSettingsDone(true);
    } else {
      if (!isInitialSettingsDone) setAhoyModalVisisble(true);
    }
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col gap-4 overflow-hidden rounded-md bg-black px-3 py-4",
        currentPlatfrom === "windows" && "rounded-b-none",
        currentPlatfrom === "macos" && "rounded-t-none"
      )}
    >
      <Outlet />

      <AndroidHomeModal />
      <DeivceOptionsModal />
      <AhoyModal />
    </div>
  );
};
