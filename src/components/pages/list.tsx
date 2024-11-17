import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

import { EmulatorListItem } from "@/components/emulator-list-item";
import { Button } from "@/components/ui/button";
import { useEmulators } from "@/queries/emulator";

export const ListPage = () => {
  const { t } = useTranslation();

  const { data: emulators } = useEmulators();

  return (
    <>
      <ul className="flex flex-1 flex-col gap-4">
        {emulators &&
          Object.values(emulators).map((emulator, i) => (
            <EmulatorListItem key={i} emulator={emulator} />
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
