import { useState } from "react";
import ZProvider from "../../contexts/ZManager/ZProvder";
import { FlexCenter, ZManagerTestContainer } from "./ZManagetTest.styles";
import RecursionLayer from "./RecursionLayer";

export default function ZManagerTest() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ZProvider>
      <ZManagerTestContainer>
        <FlexCenter>
          <button onClick={() => setIsOpen(true)}>OPEN</button>
        </FlexCenter>
      </ZManagerTestContainer>
      {isOpen && <RecursionLayer onClose={() => setIsOpen(false)} />}
    </ZProvider>
  );
}
