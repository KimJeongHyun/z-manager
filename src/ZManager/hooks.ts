import { useMemo } from "react";
import { ZManager } from "./ZManager";

export const useGetZManager = () => {
  return useMemo(() => new ZManager(), []);
};
