import { useEffect, useState } from "react";
import { useGetZContext } from "./ZContext";

export default function ZLayer({ children }: { children: React.ReactNode }) {
  const [layerId, setLayerId] = useState<string>();
  const { onMount, onUnMount, zIndex } = useGetZContext();

  useEffect(() => {
    const id = onMount();
    setLayerId(id);

    return () => {
      onUnMount(id);
    };
  }, [onMount, onUnMount]);

  return (
    <div style={{ zIndex: zIndex(layerId), position: "absolute" }}>
      {children}
    </div>
  );
}
