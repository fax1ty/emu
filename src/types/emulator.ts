export interface Emulator {
  id?: string;
  name: string;
  state: EmulatorState;
  model?: string;
  product?: string;
  transportId?: string;
  props?: Record<string, string>;
  version?: string;
  features?: string[];
  type?: EmulatorType;
}

export type EmulatorState = "offline" | "online" | "booting";
export type EmulatorType = "tv" | "phone" | "watch";
