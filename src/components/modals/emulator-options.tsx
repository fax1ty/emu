import { Drawer } from "vaul";
import { Snowflake } from "@phosphor-icons/react";
import { startEmulator } from "@/services/api/emulator";
import { useMemo } from "react";
import { platform } from "@tauri-apps/plugin-os";
import { cn } from "@/lib/utils";

interface EmulatorOptionsModalProps {
  name: string | null;
  onClose?: () => void;
}

export const EmulatorOptionsModal = ({
  name,
  onClose,
}: EmulatorOptionsModalProps) => {
  const currentPlatfrom = useMemo(() => platform(), []);

  const coldBoot = async () => {
    if (!name) return;
    onClose?.();
    await startEmulator(name);
  };

  return (
    <Drawer.Root open={!!name} onClose={onClose}>
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
                {name}
              </Drawer.Title>

              <div className="flex flex-col gap-2 mt-6">
                <button
                  className="flex h-10 bg-blue-400 justify-between items-center text-blue-900 font-primary font-semibold text-sm px-3 rounded hover:opacity-75 active:opacity-65 duration-300 disabled:opacity-60"
                  onClick={coldBoot}
                >
                  <span>Cold Boot</span>
                  <Snowflake size={18} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
