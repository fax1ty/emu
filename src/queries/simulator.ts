import useSWR from "swr";

import { getAllSimulators } from "@/services/api/simulator";
import { useAppStore } from "@/stores/app";

export const useSimulators = () => {
  const isSimulatorSupportEnabled = useAppStore(
    (state) => state.isSimulatorSupportEnabled
  );
  const isInitialSettingsDone = useAppStore(
    (state) => state.isInitialSettingsDone
  );

  const disabled = !isInitialSettingsDone || !isSimulatorSupportEnabled;

  return useSWR(
    disabled ? null : "simulators",
    async () => {
      const simulators = await getAllSimulators();
      return simulators;
    },
    { refreshInterval: 5 * 1000 }
  );
};
