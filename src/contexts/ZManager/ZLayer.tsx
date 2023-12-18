import { PropsWithChildren, useEffect, useState } from "react";
import { useGetZContext } from "./ZContext";
import { AbstractLayer } from "./styles";

interface ZLayerProps {
  isDimmed?: boolean;
  isIncrement?: boolean;
}

export default function ZLayer({
  children,
  isDimmed = false,
  isIncrement = true,
}: PropsWithChildren<ZLayerProps>) {
  const [layerId, setLayerId] = useState<string>();
  const { onMount, onUnMount, zIndex } = useGetZContext();

  useEffect(() => {
    const id = onMount({ isIncrement });
    setLayerId(id);

    return () => {
      onUnMount(id);
    };
  }, [onMount, onUnMount, isIncrement]);

  return (
    <AbstractLayer zIndex={zIndex(layerId) ?? 0} isDimmed={isDimmed}>
      {children}
    </AbstractLayer>
  );
}
