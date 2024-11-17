import { useTranslation } from "react-i18next";
import { Snowflake } from "@phosphor-icons/react";
import { Drawer } from "vaul";

import { ModalLayout } from "@/components/layouts/modal";
import { Button } from "@/components/ui/button";
import { startEmulator } from "@/services/api/emulator";
import { useModalsStore } from "@/stores/modals";

export const EmulatorOptionsModal = () => {
  const { t } = useTranslation();

  const isEmulatorOptionsModalVisible = useModalsStore(
    (state) => state.isEmulatorOptionsModalVisible
  );
  const setEmulatorOptionsModalVisible = useModalsStore(
    (state) => state.setEmulatorOptionsModalVisible
  );
  const emulatorOptionsName = useModalsStore(
    (state) => state.emulatorOptionsName
  );

  const coldBoot = async () => {
    if (!emulatorOptionsName) return;
    setEmulatorOptionsModalVisible(false);
    await startEmulator(emulatorOptionsName);
  };

  const onClose = () => {
    setEmulatorOptionsModalVisible(false);
  };

  return (
    <ModalLayout onClose={onClose} isOpen={isEmulatorOptionsModalVisible}>
      <Drawer.Title className="mb-2 font-secondary text-sm font-medium text-blue-300">
        {emulatorOptionsName}
      </Drawer.Title>

      <div className="mt-6 flex flex-col gap-2">
        <Button intent="secondary" onClick={coldBoot}>
          <span>{t("EmulatorOptionsModal.coldBoot")}</span>
          <Snowflake size={18} weight="bold" />
        </Button>
      </div>
    </ModalLayout>
  );
};
