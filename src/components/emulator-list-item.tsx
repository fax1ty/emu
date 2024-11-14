import { cn } from "@/lib/utils";
import { startEmulator, stopEmulator } from "@/services/api/emulator";
import {
  Emulator,
  EmulatorState,
  OnlineEmulator,
  OnlineEmulatorState,
  OnlineEmulatorType,
} from "@/types/emulator";
import { isOnlineEmulator } from "@/types/guards/emulator";
import {
  AndroidLogo,
  DeviceMobileCamera,
  DeviceMobileSlash,
  DeviceRotate,
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

const getTypeIcon = (
  state: EmulatorState | OnlineEmulatorState,
  type: OnlineEmulatorType | false
) => {
  if (state === "offline") return DeviceMobileSlash;
  if (state === "booting") return DeviceRotate;
  if (type === "watch") return Watch;
  if (type === "tv") return TelevisionSimple;
  return DeviceMobileCamera;
};

const getStateIcon = (state: EmulatorState | OnlineEmulatorState) => {
  if (state === "offline") return Play;
  return Stop;
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

  const EmulatorTypeIcon = getTypeIcon(
    emulator.state,
    isOnlineEmulator(emulator) && emulator.type
  );

  const EmulatorStateIcon = getStateIcon(emulator.state);

  return (
    <li className="flex items-center gap-3">
      <div
        className={cn(
          emulator.state === "offline" && "bg-red-400",
          emulator.state === "booting" && "bg-amber-400",
          emulator.state === "online" && "bg-teal-400",
          "w-12 h-9 rounded-md flex items-center justify-center text-mauve-50"
        )}
        title={getStatusAlt(emulator.state)}
      >
        <EmulatorTypeIcon size={16} weight="fill" />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0 items-start">
        <p className="text-xxs text-mauve-50 font-secondary font-medium truncate w-full">
          {emulator.name}
        </p>

        {isOnlineEmulator(emulator) && (
          <div className="bg-cyan-800 flex items-center rounded px-1 py-0.5 gap-1 text-cyan-200">
            <AndroidLogo size={14} weight="fill" />
            <p className="text-xxs font-primary font-semibold">
              Android {emulator.version}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2.5">
        <button
          className="px-4 bg-blue-900 text-blue-400 items-center flex rounded font-primary text-xs font-semibold h-8 gap-1.5 hover:opacity-75 active:opacity-65 duration-300"
          onClick={toggleEmulatorState}
        >
          <span>{emulator.state === "offline" ? "Run" : "Stop"}</span>
          <EmulatorStateIcon size={14} weight="fill" />
        </button>

        <button
          className="bg-blue-400 text-blue-900 items-center justify-center flex rounded h-8 w-8 hover:opacity-75 active:opacity-65 duration-300"
          onClick={onOptionsButtonPressed}
        >
          <DotsThreeOutlineVertical size={14} weight="fill" />
        </button>
      </div>
    </li>
  );
};
