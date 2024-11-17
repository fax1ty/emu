import { ArrowRight } from "@phosphor-icons/react";
import { Drawer } from "vaul";

import { ModalLayout } from "@/components/layouts/modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/toggle";

export const AhoyModal = () => {
  const onClose = () => {};

  return (
    <ModalLayout onClose={onClose} isOpen={false} dismissible={false}>
      <Drawer.Title className="mb-2 font-secondary text-sm font-medium text-blue-300">
        Ahoy, Captain
      </Drawer.Title>

      <p className="font-primary text-sm text-blue-200">
        This system potentially can handle multiple platforms. Don&apos;t panic.
        If any you can change settings later
      </p>

      <div className="mt-2 flex flex-col gap-1">
        <div className="flex items-center justify-between rounded-md py-2 font-medium">
          <label
            className="font-primary text-sm text-blue-200"
            htmlFor="android"
          >
            Android Emulators
          </label>
          <Switch id="android" />
        </div>

        <div className="flex items-center justify-between rounded-md py-2 font-medium">
          <label className="font-primary text-sm text-blue-200" htmlFor="apple">
            Apple Simulators
          </label>
          <Switch id="apple" />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button intent="secondary">
          <span>Go</span>
          <ArrowRight size={18} weight="bold" />
        </Button>
      </div>
    </ModalLayout>
  );
};
