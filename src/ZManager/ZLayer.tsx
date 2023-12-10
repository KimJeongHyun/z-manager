import { useEffect } from "react";
import { useGetZContext } from "./ZContext";

export default function ZLayer({ children }: { children: React.ReactNode }) {
  const { onMount, onUnMount, zIndex } = useGetZContext();

  useEffect(() => {
    const layerId = onMount();

    return () => {
      onUnMount(layerId);
    };
  }, [onMount, onUnMount]);

  return <div style={{ zIndex: zIndex() }}>{children}</div>;
}
