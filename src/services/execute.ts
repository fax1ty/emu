import { platform } from "@tauri-apps/plugin-os";
import { Command, type SpawnOptions } from "@tauri-apps/plugin-shell";

const getAndroidHomePrefix = () => {
  const currentPlatfrom = platform();

  switch (currentPlatfrom) {
    case "windows":
      return "%ANDROID_HOME%";

    default:
      return "$ANDROID_HOME";
  }
};

const makeCommand = (executable: string, args: string) => {
  const currentPlatfrom = platform();

  switch (currentPlatfrom) {
    case "windows":
      const command = ["/c", `${executable}.exe ${args}`];
      return Command.create("cmd.exe", command);

    default:
      return Command.create("sh", ["-c", `${executable} ${args}`]);
  }
};

export const execute = async (
  executable: string,
  args: string,
  options?: SpawnOptions & { timeout?: number; verbose?: boolean }
) => {
  const cmd = makeCommand(executable, args);
  cmd.stdout.on("data", (v) => {
    if (options?.verbose) console.info(executable, args, v);
  });
  if (typeof options?.timeout === "number") {
    setTimeout(() => {
      cmd.emit("close", { code: 124, signal: null });
    }, options.timeout);
  }

  const process = await cmd.execute();
  return process.stdout.replace(/\r/gm, "");
};

export const emulator = (command: string) => {
  const prefix = getAndroidHomePrefix();
  return execute(`${prefix}/emulator/emulator`, command);
};

export const adb = (command: string) => {
  const prefix = getAndroidHomePrefix();
  return execute(`${prefix}/platform-tools/adb`, command);
};

export const simctl = (command: string) => {
  return execute("xcrun simctl", command);
};

export const printenv = (command: string) => {
  return execute("printenv", command);
};
