import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

import { DeviceListItem } from "@/components/device-list-item";
import { Button } from "@/components/ui/button";
import { useEmulators } from "@/queries/emulator";
import { useSimulators } from "@/queries/simulator";

export const ListPage = () => {
  const { t } = useTranslation();

  const { data: emulators } = useEmulators();
  const { data: simulators } = useSimulators();

  return (
    <>
      <ul className="flex flex-1 flex-col gap-4">
        {emulators &&
          Object.values(emulators).map((emulator, i) => (
            <DeviceListItem key={i} device={emulator} />
          ))}
        {simulators &&
          Object.values(simulators).map((simulator, i) => (
            <DeviceListItem key={i} device={simulator} />
          ))}
      </ul>

      <Button intent="alternative" title={t("List.createTitle")} disabled>
        <span>{t("List.create")}</span>
        <Plus size={18} weight="bold" />
      </Button>

      <Outlet />
    </>
  );
};
