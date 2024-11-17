import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { platform } from "@tauri-apps/plugin-os";

import { AhoyModal } from "@/components/modals/ahoy";
import { AndroidHomeModal } from "@/components/modals/android-home";
import { EmulatorOptionsModal } from "@/components/modals/emulator-options";
import { cn } from "@/lib/utils";

export const RootLayout = () => {
  const currentPlatfrom = useMemo(() => platform(), []);

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
      <EmulatorOptionsModal />
      <AhoyModal />
    </div>
  );
};
