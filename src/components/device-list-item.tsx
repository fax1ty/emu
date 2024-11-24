import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AndroidLogo,
  AppleLogo,
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
import { startSimulator, stopSimulator } from "@/services/api/simulator";
import { useModalsStore } from "@/stores/modals";
import { Device, DeviceOS, DeviceState, DeviceType } from "@/types/device";

const getBadgeIntent = (os: DeviceOS) => {
  switch (os) {
    case "android":
      return "success" as const;
    case "ios":
      return "info" as const;
  }
};

const getBadgeIcon = (os: DeviceOS) => {
  switch (os) {
    case "android":
      return AndroidLogo;
    case "ios":
      return AppleLogo;
  }
};

const getBadgeVersion = (os: DeviceOS, version?: string) => {
  switch (os) {
    case "android":
      return `Android ${version}`;
    case "ios":
      return `iOS ${version}`;
  }
};

const getStatusAlt = (state: DeviceState) => {
  switch (state) {
    case "online":
      return "EmulatorListItem.statuses.online";
    case "offline":
      return "EmulatorListItem.statuses.offline";
    case "booting":
      return "EmulatorListItem.statuses.booting";
  }
};

const getTypeIcon = (state: DeviceState, type?: DeviceType) => {
  if (!type) {
    if (state === "offline") return DeviceMobileSlash;
    if (state === "booting") return DeviceRotate;
  }

  if (type === "watch") return Watch;
  if (type === "tv") return TelevisionSimple;

  return DeviceMobileCamera;
};

const getStateIcon = (state: DeviceState) => {
  if (state === "offline") return Play;
  return Stop;
};

interface DeviceListItemProps {
  device: Device;
}

export const DeviceListItem = ({ device }: DeviceListItemProps) => {
  const { t } = useTranslation();

  const setDeviceOptionsModalVisible = useModalsStore(
    (state) => state.setDeviceOptionsModalVisible
  );
  const setDeviceOptionsInfo = useModalsStore(
    (state) => state.setDeviceOptionsInfo
  );

  const DeviceTypeIcon = useMemo(
    () => getTypeIcon(device.state, device.type),
    [device.state, device.type]
  );

  const DeviceStateIcon = useMemo(
    () => getStateIcon(device.state),
    [device.state]
  );

  const badgeIntent = useMemo(() => getBadgeIntent(device.os), [device.os]);
  const BadgeIcon = useMemo(() => getBadgeIcon(device.os), [device.os]);
  const badgeVersion = useMemo(
    () => getBadgeVersion(device.os, device.version),
    [device.os, device.version]
  );

  const onOptionsButtonPressed = () => {
    setDeviceOptionsInfo(device);
    setDeviceOptionsModalVisible(true);
  };

  const toggleEmulatorState = async () => {
    if (device.os === "android") {
      if (device.state === "offline") {
        await startEmulator(device.name);
      } else {
        if (!device.id) return;
        await stopEmulator(device.id);
      }

      await mutate("emulators");
    } else if (device.os === "ios") {
      if (device.state === "offline") {
        if (!device.id) return;
        await startSimulator(device.id);
      } else {
        if (!device.id) return;
        await stopSimulator(device.id);
      }

      await mutate("simulators");
    }
  };

  return (
    <li className="flex items-center gap-3">
      <div
        className={cn(
          device.state === "offline" && "bg-red-400",
          device.state === "booting" && "bg-amber-400",
          device.state === "online" && "bg-teal-400",
          "flex h-9 w-12 items-center justify-center rounded-md text-mauve-50"
        )}
        title={t(getStatusAlt(device.state))}
      >
        <DeviceTypeIcon size={16} weight="fill" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <p
          className="w-full cursor-default truncate font-secondary text-xxs font-medium text-mauve-50"
          title={device.name}
        >
          {device.name}
        </p>

        {device.version && (
          <Badge intent={badgeIntent} className="cursor-default">
            <BadgeIcon size={14} weight="fill" />
            <p>{badgeVersion}</p>
          </Badge>
        )}
      </div>

      <div className="flex gap-2.5">
        <Button onClick={toggleEmulatorState} size="small">
          <span>
            {device.state === "offline"
              ? t("EmulatorListItem.buttons.run")
              : t("EmulatorListItem.buttons.stop")}
          </span>
          <DeviceStateIcon size={14} weight="fill" />
        </Button>

        <Button onClick={onOptionsButtonPressed} size="icon">
          <DotsThreeOutlineVertical size={14} weight="fill" />
        </Button>
      </div>
    </li>
  );
};
