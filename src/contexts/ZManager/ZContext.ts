import { createContext, useContext } from "react";

interface ZContextValues {
  onMount: () => string;
  onUnMount: (layerId: string) => void;
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
