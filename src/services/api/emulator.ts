import { adb, emulator } from "@/services/execute";
import { Device, DeviceState, DeviceType } from "@/types/device";

export const getAllEmulators = async () => {
  const output = await emulator("-list-avds");
  return output
    .split("\n")
    .map((v) => v.trim())
    .filter((v) => {
      if (!v) return false;
      if (v.startsWith("INFO")) return false;
      return true;
    });
};

export const getEmulatorName = async (id: string) => {
  const output = await adb(`-s ${id} emu avd name`);
  return output.split("\n").map((v) => v.trim())[0];
};

export const getEmulatorState = (
  props: Record<string, string>
): DeviceState => {
  if (props["init.svc.bootanim"] === "stopped") return "online";
  return "booting";
};

export const getEmulatorProps = async (id: string) => {
  const output = await adb(`-s ${id} shell getprop`);
  const kv = output.split("\n").map((v) => {
    const [key, value] = v.replace(/(\[|\])/gm, "").split(": ");
    return [key, value];
  });
  return Object.fromEntries(kv) as Record<string, string>;
};

export const getEmulatorFeatures = async (id: string) => {
  const output = await adb(`-s ${id} shell pm list features`);
  return output.split("\n");
};

export const getEmulatorType = (features: string[]): DeviceType => {
  if (features.includes("feature:android.hardware.type.television"))
    return "tv";
  if (features.includes("feature:android.hardware.type.watch")) return "watch";
  return "phone";
};

export const getOnlineEmulators = async () => {
  const output = await adb("devices -l");
  const rows = output
    .split("\n")
    .map((v) => v.trim())
    .filter((v) => {
      if (!v) return false;
      if (v.startsWith("List of devices attached")) return false;
      return true;
    });

  const emulators: Record<string, Device> = {};

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
      os: "android",
    };
  }

  return emulators;
};

export const startEmulator = async (name: string, cold = false) => {
  const args: string[] = ["@" + name];

  if (cold) args.push("-no-snapshot-load");

  await emulator(args.join(" "));
};

export const stopEmulator = async (id: string) => {
  await adb(`-s ${id} emu kill`);
};
