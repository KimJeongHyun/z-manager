import ZContext from "./ZContext";
import { ZManager } from "./ZManager";

const ZManagerInstance = new ZManager();

export default function ZProvider({ children }: { children: React.ReactNode }) {
  const providerValue = {
    onMount: ZManagerInstance.onMount.bind(ZManagerInstance),
    onUnMount: ZManagerInstance.onUnMount.bind(ZManagerInstance),
    zIndex: ZManagerInstance.zIndex.bind(ZManagerInstance),
  };

  return (
    <ZContext.Provider value={providerValue}>{children}</ZContext.Provider>
  );
}
