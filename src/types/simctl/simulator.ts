export type SimulatorState = "Shutdown" | "Booted" | "Shutting Down";

export interface Simulator {
  availabilityError?: string;
  lastBootedAt?: string;
  dataPath: string;
  dataPathSize: number;
  logPath: string;
  udid: string;
  isAvailable: boolean;
  logPathSize: number;
  deviceTypeIdentifier: string;
  state: SimulatorState;
  name: string;
}

export interface SimulatorListResponse {
  devices: Record<string, Simulator[]>;
}
