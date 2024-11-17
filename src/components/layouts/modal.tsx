import { ReactNode, useMemo } from "react";
import { platform } from "@tauri-apps/plugin-os";
import { Drawer } from "vaul";

import { cn } from "@/lib/utils";

interface ModalLayoutProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  dismissible?: boolean;
}

export const ModalLayout = ({
  children,
  onClose,
  isOpen,
  dismissible = true,
}: ModalLayoutProps) => {
  const currentPlatfrom = useMemo(() => platform(), []);

  return (
    <Drawer.Root open={isOpen} onClose={onClose} dismissible={dismissible}>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn(
            "fixed inset-0 rounded-md bg-black/40",
            currentPlatfrom === "windows" && "rounded-b-none",
            currentPlatfrom === "macos" && "rounded-t-none"
          )}
        />
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 flex h-fit flex-col rounded-t-[10px] bg-blue-800 outline-none",
            currentPlatfrom === "macos" && "rounded-b-md"
          )}
        >
          <div className="flex-1 rounded-t-[10px] px-3 pb-4 pt-2">
            <div
              aria-hidden
              className="mx-auto mb-3 h-1.5 w-12 shrink-0 rounded-full bg-blue-200"
            />

            <div className="mx-auto max-w-md">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
