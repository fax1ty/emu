import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Snowflake } from "@phosphor-icons/react";
import { Drawer } from "vaul";

import { ModalLayout } from "@/components/layouts/modal";
import { Button } from "@/components/ui/button";
import { startEmulator } from "@/services/api/emulator";
import { useModalsStore } from "@/stores/modals";

export const DeivceOptionsModal = () => {
  const { t } = useTranslation();

  const isDeviceOptionsModalVisible = useModalsStore(
    (state) => state.isDeviceOptionsModalVisible
  );
  const setDeviceOptionsModalVisible = useModalsStore(
    (state) => state.setDeviceOptionsModalVisible
  );
  const deviceOptionsInfo = useModalsStore((state) => state.deviceOptionsInfo);

  const isAndroid = useMemo(
    () => deviceOptionsInfo?.os === "android",
    [deviceOptionsInfo?.os]
  );

  const coldBoot = async () => {
    if (!deviceOptionsInfo) return;

    setDeviceOptionsModalVisible(false);
    await startEmulator(deviceOptionsInfo.name, true);
  };

  const onClose = () => {
    setDeviceOptionsModalVisible(false);
  };

  return (
    <ModalLayout onClose={onClose} isOpen={isDeviceOptionsModalVisible}>
      <Drawer.Title className="mb-2 font-secondary text-sm font-medium text-blue-300">
        {deviceOptionsInfo?.name}
      </Drawer.Title>

      <div className="mt-6 flex flex-col gap-2">
        <Button
          intent="secondary"
          onClick={coldBoot}
          disabled={!isAndroid}
          title={
            (!isAndroid && t("DeviceOptionsModal.coldBootNotApplicable")) ||
            undefined
          }
        >
          <span>{t("DeviceOptionsModal.coldBoot")}</span>
          <Snowflake size={18} weight="bold" />
        </Button>
      </div>
    </ModalLayout>
  );
};
