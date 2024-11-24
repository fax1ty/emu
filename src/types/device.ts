export interface Device {
  id?: string;
  name: string;
  state: DeviceState;
  model?: string;
  product?: string;
  transportId?: string;
  props?: Record<string, string>;
  version?: string;
  os: DeviceOS;
  features?: string[];
  type?: DeviceType;
}

export type DeviceState = "offline" | "online" | "booting";
export type DeviceType = "tv" | "phone" | "watch";
export type DeviceOS = "android" | "ios";
