import { useEmulators } from "@/queries/emulator";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import { EmulatorListItem } from "@/components/emulator-list-item";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useNoContext } from "@/hooks/no-context";
import { AndroidHomeModal } from "./components/modals/android-home";
import { EmulatorOptionsModal } from "./components/modals/emulator-options";

import "./app.css";

function App() {
  useNoContext();

  const { data: emulators } = useEmulators();

  const [selectedEmulator, setSelectedEmulator] = useState<string | null>(null);

  const minimize = async () => {
    const window = getCurrentWindow();
    await window.minimize();
  };

  const close = async () => {
    const window = getCurrentWindow();
    await window.close();
  };

  const onEmulatorOptionsClose = () => {
    setSelectedEmulator(null);
  };

  return (
    <>
      <nav className="bg-blue-300 h-7 flex items-center justify-between pl-2.5 rounded-md overflow-hidden">
        <p className="pointer-events-none font-primary font-semibold text-xs text-blue-700">
          Device Manager
        </p>

        <div className="flex text-blue-700 relative">
          <button
            className="w-7 h-7 hover:bg-blue-50 duration-300 flex items-center justify-center rounded-md rounded-r-none"
            onClick={minimize}
          >
            <Minus size={14} weight="bold" />
          </button>
          <button
            className="w-7 h-7 hover:bg-blue-50 duration-300 flex items-center justify-center"
            onClick={close}
          >
            <X size={14} weight="bold" />
          </button>
        </div>
      </nav>

      <main className="flex flex-col flex-1">
        <ul className="flex flex-1 flex-col gap-4">
          {emulators &&
            Object.values(emulators).map((emulator, i) => (
              <EmulatorListItem
                key={i}
                emulator={emulator}
                onOptionsButtonPressed={() =>
                  setSelectedEmulator(emulator.name)
                }
              />
            ))}
        </ul>

        <button
          title="Will be available in future versions"
          disabled
          className="flex h-10 bg-purple-800 justify-between items-center text-purple-200 font-primary font-semibold text-sm px-3 rounded hover:opacity-75 active:opacity-65 duration-300 disabled:opacity-60"
        >
          <span>Create</span>
          <Plus size={18} weight="bold" />
        </button>
      </main>

      <AndroidHomeModal />
      <EmulatorOptionsModal
        name={selectedEmulator}
        onClose={onEmulatorOptionsClose}
      />
    </>
  );
}

export default App;
