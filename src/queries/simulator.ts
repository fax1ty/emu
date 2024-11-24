import useSWR from "swr";

import { getAllSimulators } from "@/services/api/simulator";

export const useSimulators = () => {
  return useSWR(
    "simulators",
    async () => {
      const simulators = await getAllSimulators();
      return simulators;
    },
    { refreshInterval: 5 * 1000 }
  );
};
