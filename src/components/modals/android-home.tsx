import { Trans, useTranslation } from "react-i18next";
import { SignOut, Skull } from "@phosphor-icons/react";
import { exit as exitBase } from "@tauri-apps/plugin-process";
import { open } from "@tauri-apps/plugin-shell";
import { mutate } from "swr";
import { Drawer } from "vaul";

import { ModalLayout } from "@/components/layouts/modal";
import { Button } from "@/components/ui/button";
import { Warning } from "@/components/ui/warning";
import { useAppStore } from "@/stores/app";
import { useModalsStore } from "@/stores/modals";

export const AndroidHomeModal = () => {
  const { t } = useTranslation();

  const isAndroidHomeModalVisible = useModalsStore(
    (state) => state.isAndroidHomeModalVisible
  );
  const setAndroidHomeModalVisible = useModalsStore(
    (state) => state.setAndroidHomeModalVisible
  );
  const androidHomeModalError = useModalsStore(
    (state) => state.androidHomeModalError
  );
  const setDangerModeEnabled = useAppStore(
    (state) => state.setDangerModeEnabled
  );

  const onClose = () => {
    setAndroidHomeModalVisible(false);
  };

  const exit = async () => {
    await exitBase();
  };

  const close = async () => {
    setDangerModeEnabled(true);
    setAndroidHomeModalVisible(false);
    await mutate("emulators");
  };

  const openAndroidDeveloperPortal = async () => {
    await open("https://developer.android.com/tools/variables#android_home");
  };

  const openStackOverflow = async () => {
    await open("https://stackoverflow.com/search?q=android_home");
  };

  return (
    <ModalLayout
      onClose={onClose}
      isOpen={isAndroidHomeModalVisible}
      dismissible={false}
    >
      <Drawer.Title className="mb-2 font-secondary text-sm font-medium text-blue-300">
        {t("AndroidHomeModal.title")}
      </Drawer.Title>

      <p className="font-primary text-sm text-blue-200">
        <Trans
          i18nKey="AndroidHomeModal.text"
          components={{
            1: <Button intent="link" onClick={openAndroidDeveloperPortal} />,
            2: <Button intent="link" onClick={openStackOverflow} />,
          }}
        />
      </p>

      {androidHomeModalError && (
        <Warning>
          {t("AndroidHomeModal.warning", { error: androidHomeModalError })}
        </Warning>
      )}

      <div className="mt-6 flex flex-col gap-2">
        <Button intent="secondary" onClick={exit}>
          <span>{t("AndroidHomeModal.buttons.exit")}</span>
          <SignOut size={18} weight="bold" />
        </Button>

        <button
          className="flex h-10 items-center justify-between rounded bg-blue-900 px-3 font-primary text-sm font-semibold text-blue-400 duration-300 hover:opacity-75 active:opacity-65 disabled:opacity-60"
          onClick={close}
        >
          <span>{t("AndroidHomeModal.buttons.risk")}</span>
          <Skull size={18} weight="bold" />
        </button>
      </div>
    </ModalLayout>
  );
};
