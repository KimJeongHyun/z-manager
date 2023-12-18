import { createContext, useContext } from "react";
import { ZIndexBaseType } from "./ZManager";

interface ZContextValues {
  onMount: ({ isIncrement }: { isIncrement: boolean }) => string;
  onUnMount: (layerId: string) => void;
  onBasePush: (base: keyof ZIndexBaseType, index: number) => string;
  zIndex: (layerId?: string) => number | undefined;
}

const ZContext = createContext<ZContextValues | null>(null);

export const useGetZContext = () => {
  const context = useContext(ZContext);

  if (!context) {
    throw new Error(
      "You have to call this hook in ZContext's child components."
    );
  }

  return context;
};

export default ZContext;
