import { useState } from "react";
import ZLayer from "../../contexts/ZManager/ZLayer";
import { FlexCenter } from "./ZManagetTest.styles";

export default function RecursionLayer({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZLayer isDimmed isIncrement={false}>
      <FlexCenter>
        <button onClick={() => setIsOpen(true)}>OPEN</button>
        <button onClick={onClose}>CLOSE</button>
      </FlexCenter>

      {isOpen && <RecursionLayer onClose={() => setIsOpen(false)} />}
    </ZLayer>
  );
}
