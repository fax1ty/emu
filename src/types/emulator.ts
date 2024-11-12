export type EmulatorState = "online" | "offline";

export interface Emulator {
  name: string;
  state: EmulatorState;
}

export type OnlineEmulatorState = "online" | "booting";
export type OnlineEmulatorType = "tv" | "phone" | "watch";

export interface OnlineEmulator {
  id: string;
  name: string;
  state: OnlineEmulatorState;
  model: string;
  product: string;
  transportId: string;
  props: Record<string, string>;
  version: string;
  features: string[];
  type: OnlineEmulatorType;
}
