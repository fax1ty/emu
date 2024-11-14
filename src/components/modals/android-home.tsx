import { useModalsStore } from "@/stores/modals";
import { exit as exitBase } from "@tauri-apps/plugin-process";
import { open } from "@tauri-apps/plugin-shell";
import { Drawer } from "vaul";
import { SealWarning, SignOut, Skull } from "@phosphor-icons/react";
import { useAppStore } from "@/stores/app";
import { mutate } from "swr";
import { useMemo } from "react";
import { platform } from "@tauri-apps/plugin-os";
import { cn } from "@/lib/utils";

export const AndroidHomeModal = () => {
  const isAndroidHomeModalVisible = useModalsStore(
    (state) => state.isAndroidHomeModalVisible
  );
  const setAndroidHomeModalVisible = useModalsStore(
    (state) => state.setAndroidHomeModalVisible
  );
  const androidHomeModalError = useModalsStore(
    (state) => state.androidHomeModalError
  );
  const setDangerModeEnabled = useAppStore(
    (state) => state.setDangerModeEnabled
  );

  const currentPlatfrom = useMemo(() => platform(), []);

  const exit = async () => {
    await exitBase();
  };

  const close = async () => {
    setDangerModeEnabled(true);
    setAndroidHomeModalVisible(false);
    await mutate("emulators");
  };

  const openAndroidDeveloperPortal = async () => {
    await open("https://developer.android.com/tools/variables#android_home");
  };

  const openStackOverflow = async () => {
    await open("https://stackoverflow.com/search?q=android_home");
  };

  return (
    <Drawer.Root open={isAndroidHomeModalVisible} dismissible={false}>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn(
            "fixed inset-0 bg-black/40 rounded-md",
            currentPlatfrom === "windows" && "rounded-b-none",
            currentPlatfrom === "macos" && "rounded-t-none"
          )}
        />
        <Drawer.Content
          className={cn(
            "bg-blue-800 flex flex-col rounded-t-[10px] h-fit fixed bottom-0 left-0 right-0 outline-none",
            currentPlatfrom === "macos" && "rounded-b-md"
          )}
        >
          <div className="px-3 pt-2 pb-4 bg-white rounded-t-[10px] flex-1">
            <div
              aria-hidden
              className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-blue-200 mb-3"
            />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-secondary font-medium text-sm mb-2 text-blue-300">
                ANDROID_HOME is missing
              </Drawer.Title>

              <p className="text-gray-600 font-primary text-sm text-blue-200">
                At this stage, we are unable to automatically locate the
                necessary libraries. We would like to use your Android Studio
                installation, but we are unable to find the specified
                environment variable.
                <br />
                <br />
                You can find a brief description of the variable on the{" "}
                <button
                  className="inline-flex underline underline-offset-4 font-semibold hover:opacity-75 active:opacity-65 duration-300 disabled:opacity-60"
                  onClick={openAndroidDeveloperPortal}
                >
                  Android Developer Platform
                </button>
                . Or you can try searching for help on{" "}
                <button
                  className="inline-flex underline underline-offset-4 font-semibold hover:opacity-75 active:opacity-65 duration-300 disabled:opacity-60"
                  onClick={openStackOverflow}
                >
                  Stack Overflow
                </button>
                .
              </p>

              {androidHomeModalError && (
                <blockquote className="bg-blue-300 rounded-sm mt-3 px-3 py-2 text-blue-900 text-xs font-secondary flex gap-2">
                  <SealWarning size={24} weight="fill" />
                  <p className="flex-1">Error: {androidHomeModalError}</p>
                </blockquote>
              )}

              <div className="flex flex-col gap-2 mt-6">
                <button
                  className="flex h-10 bg-blue-400 justify-between items-center text-blue-900 font-primary font-semibold text-sm px-3 rounded hover:opacity-75 active:opacity-65 duration-300 disabled:opacity-60"
                  onClick={exit}
                >
                  <span>Play safe. Exit</span>
                  <SignOut size={18} weight="bold" />
                </button>

                <button
                  className="flex h-10 bg-blue-900 justify-between items-center text-blue-400 font-primary font-semibold text-sm px-3 rounded hover:opacity-75 active:opacity-65 duration-300 disabled:opacity-60"
                  onClick={close}
                >
                  <span>At my own risk. Banzai!</span>
                  <Skull size={18} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
