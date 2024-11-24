import { execute, simctl } from "@/services/execute";
import { Device, DeviceState } from "@/types/device";
import { RuntimeListResponse } from "@/types/simctl/runtime";
import {
  Simulator,
  SimulatorListResponse,
  SimulatorState,
} from "@/types/simctl/simulator";

export const getAllSimulators = async (): Promise<Device[]> => {
  const runtimes = await getAllRuntimes();

  const output = await simctl("list devices --json");
  const { devices } = JSON.parse(output) as SimulatorListResponse;
  const list = Object.entries(devices)
    .flatMap(([runtime, devices]) =>
      devices.map((device) => ({ ...device, runtime }))
    )
    .filter((device) => !device.availabilityError && device.lastBootedAt);

  return list.map((device) => {
    const runtime = runtimes.find(
      (runtime) => runtime.identifier === device.runtime
    );
    const version = runtime?.version;
    const state = parseSimulatorState(device.state);

    return {
      id: device.udid,
      name: device.name,
      state,
      model: device.deviceTypeIdentifier,
      version,
      type: "phone",
      os: "ios",
    };
  });
};

export const parseSimulatorState = (state: SimulatorState): DeviceState => {
  switch (state) {
    case "Shutdown":
      return "offline";
    case "Booted":
      return "online";
    case "Shutting Down":
      return "offline";
    default:
      return "booting";
  }
};

export const getAllRuntimes = async () => {
  const output = await simctl("list runtimes --json");
  const { runtimes } = JSON.parse(output) as RuntimeListResponse;
  return runtimes;
};

export const startSimulator = async (id: Simulator["udid"]) => {
  const output = await simctl(`boot ${id}`);
  await execute("open", "-a Simulator");
  return output;
};

export const stopSimulator = async (id: Simulator["udid"]) => {
  const output = await simctl(`shutdown ${id}`);
  await execute("pkill", "-x Simulator");
  return output;
};
