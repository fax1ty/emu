import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { startEmulator, stopEmulator } from "@/services/api/emulator";
import { useModalsStore } from "@/stores/modals";
import { Emulator, EmulatorState, EmulatorType } from "@/types/emulator";

const getStatusAlt = (state: EmulatorState) => {
  switch (state) {
    case "online":
      return "EmulatorListItem.statuses.online";
    case "offline":
      return "EmulatorListItem.statuses.offline";
    case "booting":
      return "EmulatorListItem.statuses.booting";
  }
};

const getTypeIcon = (state: EmulatorState, type?: EmulatorType) => {
  if (!type) {
    if (state === "offline") return DeviceMobileSlash;
    if (state === "booting") return DeviceRotate;
  }

  if (type === "watch") return Watch;
  if (type === "tv") return TelevisionSimple;

  return DeviceMobileCamera;
};

const getStateIcon = (state: EmulatorState) => {
  if (state === "offline") return Play;
  return Stop;
};

interface EmulatorListItemProps {
  emulator: Emulator;
}

export const EmulatorListItem = ({ emulator }: EmulatorListItemProps) => {
  const { t } = useTranslation();

  const toggleEmulatorState = async () => {
    if (emulator.state === "offline") {
      await startEmulator(emulator.name);
      await mutate("emulators");
    } else {
      if (!emulator.id) return;
      await stopEmulator(emulator.id);
      await mutate("emulators");
    }
  };

  const setEmulatorOptionsModalVisible = useModalsStore(
    (state) => state.setEmulatorOptionsModalVisible
  );
  const setEmulatorOptionsName = useModalsStore(
    (state) => state.setEmulatorOptionsName
  );

  const EmulatorTypeIcon = useMemo(
    () => getTypeIcon(emulator.state, emulator.type),
    [emulator.state, emulator.type]
  );

  const EmulatorStateIcon = useMemo(
    () => getStateIcon(emulator.state),
    [emulator.state]
  );

  const onOptionsButtonPressed = () => {
    setEmulatorOptionsName(emulator.name);
    setEmulatorOptionsModalVisible(true);
  };

  return (
    <li className="flex items-center gap-3">
      <div
        className={cn(
          emulator.state === "offline" && "bg-red-400",
          emulator.state === "booting" && "bg-amber-400",
          emulator.state === "online" && "bg-teal-400",
          "flex h-9 w-12 items-center justify-center rounded-md text-mauve-50"
        )}
        title={t(getStatusAlt(emulator.state))}
      >
        <EmulatorTypeIcon size={16} weight="fill" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <p
          className="w-full truncate font-secondary text-xxs font-medium text-mauve-50"
          title={emulator.name}
        >
          {emulator.name}
        </p>

        {emulator.version && (
          <Badge intent="success">
            <AndroidLogo size={14} weight="fill" />
            <p>Android {emulator.version}</p>
          </Badge>
        )}
      </div>

      <div className="flex gap-2.5">
        <Button onClick={toggleEmulatorState} size="small">
          <span>
            {emulator.state === "offline"
              ? t("EmulatorListItem.buttons.run")
              : t("EmulatorListItem.buttons.stop")}
          </span>
          <EmulatorStateIcon size={14} weight="fill" />
        </Button>

        <Button onClick={onOptionsButtonPressed} size="icon">
          <DotsThreeOutlineVertical size={14} weight="fill" />
        </Button>
      </div>
    </li>
  );
};
