import { execute } from "@/services/execute";
import {
  OnlineEmulator,
  OnlineEmulatorState,
  OnlineEmulatorType,
} from "@/types/emulator";

export const getAllEmulators = async () => {
  const output = await execute("cmd.exe", [
    "/c",
    "%ANDROID_HOME%/emulator/emulator.exe -list-avds",
  ]);
  return output
    .split("\r\n")
    .map((v) => v.trim())
    .filter((v) => {
      if (!v) return false;
      if (v.startsWith("INFO")) return false;
      return true;
    });
};

export const getEmulatorName = async (id: string) => {
  const output = await execute("cmd.exe", [
    "/c",
    `%ANDROID_HOME%/platform-tools/adb.exe -s ${id} emu avd name`,
  ]);
  return output.split("\r\n").map((v) => v.trim())[0];
};

export const getEmulatorState = (
  props: Record<string, string>
): OnlineEmulatorState => {
  if (props["init.svc.bootanim"] === "stopped") return "online";
  return "booting";
};

export const getEmulatorProps = async (id: string) => {
  const output = await execute("cmd.exe", [
    "/c",
    `%ANDROID_HOME%/platform-tools/adb.exe -s ${id} shell getprop`,
  ]);
  const kv = output.split("\r\n").map((v) => {
    const [key, value] = v.replace(/(\[|\])/gm, "").split(": ");
    return [key, value];
  });
  return Object.fromEntries(kv) as Record<string, string>;
};

export const getEmulatorFeatures = async (id: string) => {
  const output = await execute("cmd.exe", [
    "/c",
    `%ANDROID_HOME%/platform-tools/adb.exe -s ${id} shell pm list features`,
  ]);
  return output.split("\r\n");
};

export const getEmulatorType = (features: string[]): OnlineEmulatorType => {
  if (features.includes("feature:android.hardware.type.television"))
    return "tv";
  if (features.includes("feature:android.hardware.type.watch")) return "watch";
  return "phone";
};

export const getOnlineEmulators = async () => {
  const output = await execute("cmd.exe", [
    "/c",
    "%ANDROID_HOME%/platform-tools/adb.exe devices -l",
  ]);
  const rows = output
    .split("\r\n")
    .map((v) => v.trim())
    .filter((v) => {
      if (!v) return false;
      if (v.startsWith("List of devices attached")) return false;
      return true;
    });

  const emulators: Record<string, OnlineEmulator> = {};

  for (const row of rows) {
    const kv = row.split(/\s/gm).map((v, i) => {
      const [key, value] = v.split(":");
      return [!value ? i : key, value || key];
    });
    const { model, product, transport_id, ...info }: Record<string, string> =
      Object.fromEntries(kv);

    const id = info[0];
    const name = await getEmulatorName(id);
    const props = await getEmulatorProps(id);
    const state = getEmulatorState(props);
    const version = props["ro.build.version.release"];
    const features = await getEmulatorFeatures(id);
    const type = getEmulatorType(features);

    emulators[name] = {
      id,
      name,
      state,
      model,
      product,
      transportId: transport_id,
      props,
      features,
      version,
      type,
    };
  }

  return emulators;
};

export const startEmulator = async (name: string, cold = false) => {
  const args: string[] = ["@" + name];

  if (cold) args.push("-no-snapshot-load");

  await execute("cmd.exe", [
    "/c",
    `%ANDROID_HOME%/emulator/emulator.exe ` + args.join(" "),
  ]);
};

export const stopEmulator = async (id: string) => {
  await execute("cmd.exe", [
    "/c",
    `%ANDROID_HOME%/platform-tools/adb.exe -s ${id} emu kill`,
  ]);
};
