import { Emulator, OnlineEmulator } from "@/types/emulator";

export const isOnlineEmulator = (
  emulator: Emulator | OnlineEmulator
): emulator is OnlineEmulator => emulator.state === "online";
