import { cn } from "@/lib/utils";
import { startEmulator, stopEmulator } from "@/services/api/emulator";
import {
  Emulator,
  EmulatorState,
  OnlineEmulator,
  OnlineEmulatorState,
} from "@/types/emulator";
import { isOnlineEmulator } from "@/types/guards/emulator";
import {
  Circle,
  DeviceMobileCamera,
  DotsThreeOutlineVertical,
  Play,
  Stop,
  TelevisionSimple,
  Watch,
} from "@phosphor-icons/react";
import { mutate } from "swr";

const getStatusAlt = (state: EmulatorState | OnlineEmulatorState) => {
  switch (state) {
    case "online":
      return "Online";
    case "offline":
      return "Offline";
    case "booting":
      return "Booting";
  }
};

interface EmulatorListItemProps {
  emulator: Emulator | OnlineEmulator;
  onOptionsButtonPressed?: React.MouseEventHandler<HTMLButtonElement>;
}

export const EmulatorListItem = ({
  emulator,
  onOptionsButtonPressed,
}: EmulatorListItemProps) => {
  const toggleEmulatorState = async () => {
    if (!isOnlineEmulator(emulator)) {
      await startEmulator(emulator.name);
      await mutate("emulators");
    } else {
      await stopEmulator(emulator.id);
      await mutate("emulators");
    }
  };

  return (
    <li className="flex items-center gap-2 h-12">
      <Circle
        size={12}
        weight="fill"
        className={cn(
          emulator.state === "offline" && "text-red-500",
          emulator.state === "booting" && "text-yellow-500",
          emulator.state === "online" && "text-green-500"
        )}
        alt={getStatusAlt(emulator.state)}
      />

      {isOnlineEmulator(emulator) && (
        <>
          {emulator.type === "tv" && (
            <TelevisionSimple size={16} weight="fill" />
          )}
          {emulator.type === "watch" && <Watch size={16} weight="fill" />}
          {emulator.type === "phone" && (
            <DeviceMobileCamera size={16} weight="fill" />
          )}
        </>
      )}

      <span className="flex-1">{emulator.name}</span>

      <span className="flex gap-1.5">
        <button
          onClick={toggleEmulatorState}
          className="hover:opacity-70 duration-300"
        >
          {emulator.state === "offline" && <Play size={18} weight="fill" />}
          {emulator.state !== "offline" && <Stop size={18} weight="fill" />}
        </button>

        <button
          onClick={onOptionsButtonPressed}
          className="hover:opacity-80 duration-200"
        >
          <DotsThreeOutlineVertical size={18} weight="fill" />
        </button>
      </span>
    </li>
  );
};
