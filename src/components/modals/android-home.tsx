import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModalsStore } from "@/stores/modals";
import { mutate } from "swr";
import { exit as exitBase } from "@tauri-apps/plugin-process";
import { open } from "@tauri-apps/plugin-shell";
import { Button } from "@/components/ui/button";

export const AndroidHomeModal = () => {
  const isAndroidHomeModalVisible = useModalsStore(
    (state) => state.isAndroidHomeModalVisible
  );
  const setAndroidHomeModalVisible = useModalsStore(
    (state) => state.setAndroidHomeModalVisible
  );

  const exit = async () => {
    await exitBase();
  };

  const retry = async () => {
    await mutate("emulators");
    setAndroidHomeModalVisible(false);
  };

  const openAndroidDeveloperPortal = async () => {
    await open("https://developer.android.com/tools/variables#android_home");
  };

  const openStackOverflow = async () => {
    await open("https://stackoverflow.com/search?q=android_home");
  };

  return (
    <AlertDialog open={isAndroidHomeModalVisible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ANDROID_HOME is missing</AlertDialogTitle>
          <AlertDialogDescription>
            At this stage, we are unable to automatically locate the necessary
            libraries. We would like to use your Android Studio installation,
            but we are unable to find the specified environment variable.
            <br />
            <br />
            You can find a brief description of the variable on the{" "}
            <Button
              variant="link"
              onClick={openAndroidDeveloperPortal}
              className="p-0"
            >
              Android Developer Platform
            </Button>
            . Or you can try searching for help on{" "}
            <Button variant="link" onClick={openStackOverflow} className="p-0">
              Stack Overflow
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={exit}>Exit</AlertDialogCancel>
          <AlertDialogAction autoFocus onClick={retry}>
            Retry
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
