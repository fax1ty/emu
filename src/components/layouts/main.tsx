import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Minus, X } from "@phosphor-icons/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useSWRConfig } from "swr";

import { useNoContext } from "@/hooks/no-context";

export const MainLayout = () => {
  useNoContext();

  const { cache } = useSWRConfig();
  const { t } = useTranslation();

  const hide = async () => {
    const window = getCurrentWindow();
    await window.hide();
  };

  const close = async () => {
    const map = cache as Map<string, unknown>;
    const appCache = JSON.stringify(Object.fromEntries(map.entries()));
    localStorage.setItem("emu-cache", appCache);

    const window = getCurrentWindow();
    await window.close();
  };

  return (
    <>
      <nav className="flex h-7 items-center justify-between overflow-hidden rounded-md bg-blue-300 pl-2.5">
        <p className="pointer-events-none font-primary text-xs font-semibold text-blue-700">
          {t("MainLayout.title")}
        </p>

        <div className="relative flex text-blue-700">
          <button
            className="flex size-7 items-center justify-center rounded-md rounded-r-none duration-300 hover:bg-blue-50"
            onClick={hide}
          >
            <Minus size={14} weight="bold" />
          </button>
          <button
            className="flex size-7 items-center justify-center duration-300 hover:bg-blue-50"
            onClick={close}
          >
            <X size={14} weight="bold" />
          </button>
        </div>
      </nav>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </>
  );
};
