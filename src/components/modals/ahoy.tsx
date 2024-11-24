import { useTranslation } from "react-i18next";
import { AnchorSimple, ArrowRight } from "@phosphor-icons/react";
import useSound from "use-sound";
import { Drawer } from "vaul";

import { ModalLayout } from "@/components/layouts/modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/toggle";
import { useAppStore } from "@/stores/app";
import { useModalsStore } from "@/stores/modals";

export const AhoyModal = () => {
  const { t } = useTranslation();
  const [play] = useSound("/horn.mp3");

  const isAhoyModalVisisble = useModalsStore(
    (state) => state.isAhoyModalVisisble
  );
  const setAhoyModalVisisble = useModalsStore(
    (state) => state.setAhoyModalVisisble
  );
  const isEmulatorSupportEnabled = useAppStore(
    (state) => state.isEmulatorSupportEnabled
  );
  const isSimulatorSupportEnabled = useAppStore(
    (state) => state.isSimulatorSupportEnabled
  );
  const setInitialSettingsDone = useAppStore(
    (state) => state.setInitialSettingsDone
  );

  const onClose = () => {
    setAhoyModalVisisble(false);
  };

  const save = () => {
    setInitialSettingsDone(true);
    setAhoyModalVisisble(false);
  };

  const playHorn = () => {
    play();
  };

  return (
    <ModalLayout
      onClose={onClose}
      isOpen={isAhoyModalVisisble}
      dismissible={false}
    >
      <Drawer.Title className="mb-2 inline-flex items-center gap-3 font-secondary text-sm font-medium text-blue-300">
        <span>{t("AhoyModal.title")}</span>
        <button onClick={playHorn}>
          <AnchorSimple size={14} weight="bold" />
        </button>
      </Drawer.Title>

      <p className="font-primary text-sm text-blue-200">
        {t("AhoyModal.text")}
      </p>

      <div className="mt-2 flex flex-col gap-1">
        <div className="flex items-center justify-between rounded-md py-2 font-medium">
          <label
            className="font-primary text-sm text-blue-200"
            htmlFor="android"
          >
            {t("AhoyModal.emulators")}
          </label>
          <Switch id="android" checked={isEmulatorSupportEnabled} />
        </div>

        <div className="flex items-center justify-between rounded-md py-2 font-medium">
          <label className="font-primary text-sm text-blue-200" htmlFor="apple">
            {t("AhoyModal.simulators")}
          </label>
          <Switch id="apple" checked={isSimulatorSupportEnabled} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button intent="secondary" onClick={save}>
          <span>{t("AhoyModal.save")}</span>
          <ArrowRight size={18} weight="bold" />
        </Button>
      </div>
    </ModalLayout>
  );
};
