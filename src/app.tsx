import { useEmulators } from "@/queries/emulator";
import { Minus, X } from "@phosphor-icons/react";
import { startEmulator } from "@/services/api/emulator";
import { Item, Menu, useContextMenu } from "react-contexify";
import { useState } from "react";
import { EmulatorListItem } from "@/components/emulator-list-item";
import { AndroidHomeModal } from "@/components/modals/android-home";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useNoContext } from "@/hooks/no-context";

import "./app.css";

function App() {
  useNoContext();

  const { data: emulators } = useEmulators();

  const { show } = useContextMenu({
    id: "emulator-more",
  });

  const [selectedEmulator, setSelectedEmulator] = useState<string | null>(null);

  const minimize = async () => {
    const window = getCurrentWindow();
    await window.minimize();
  };

  const close = async () => {
    const window = getCurrentWindow();
    await window.close();
  };

  if (!emulators) return null;

  return (
    <>
      <nav
        className="h-12 flex items-center justify-between pl-4"
        data-tauri-drag-region
      >
        <p className="pointer-events-none">Device Manager</p>

        <ul className="flex">
          <li>
            <button
              className="w-14 h-12 hover:bg-shark-700 duration-300 flex items-center justify-center"
              onClick={minimize}
            >
              <Minus size={18} />
            </button>
          </li>
          <li>
            <button
              className="w-14 h-12 hover:bg-shark-700 duration-300 flex items-center justify-center"
              onClick={close}
            >
              <X size={18} />
            </button>
          </li>
        </ul>
      </nav>

      <main className="flex-1 px-4 pb-2 py-1">
        <ul>
          {Object.values(emulators).map((emulator, i) => (
            <EmulatorListItem
              key={i}
              emulator={emulator}
              onOptionsButtonPressed={(event) => {
                setSelectedEmulator(emulator.name);
                show({
                  event,
                });
              }}
            />
          ))}
        </ul>
      </main>

      <Menu
        id="emulator-more"
        onVisibilityChange={(visible) => {
          if (!visible) setSelectedEmulator(null);
        }}
      >
        <Item
          disabled={
            !selectedEmulator ||
            emulators[selectedEmulator]?.state !== "offline"
          }
          onClick={async () => {
            if (!selectedEmulator) return;
            await startEmulator(selectedEmulator, true);
          }}
        >
          Cold Boot
        </Item>
      </Menu>

      <AndroidHomeModal />
    </>
  );
}

export default App;
