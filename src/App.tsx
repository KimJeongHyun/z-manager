import "./reset.css";
import { useState } from "react";
import ZProxyTest from "./components/ZProxyTest/ZProxyTest";
import ZManagerTest from "./components/ZManagerTest/ZManagerTest";
import { ButtonContainer, Button, Divider } from "./App.styles";

type ModeType = "proxy" | "manager" | "class";

const modes: ModeType[] = ["proxy", "manager", "class"];

function App() {
  const [testMode, setTestMode] = useState<ModeType>("proxy");

  const renderTestComponent = () => {
    switch (testMode) {
      case "proxy":
        return <ZProxyTest />;
      case "manager":
        return <ZManagerTest />;
      case "class":
      default:
        null;
    }
  };

  return (
    <>
      <ButtonContainer>
        {modes.map((mode) => (
          <Button
            key={mode}
            onClick={() => setTestMode(mode)}
          >{`${mode}로 변환합니다.`}</Button>
        ))}
        <Divider />
      </ButtonContainer>
      {renderTestComponent()}
    </>
  );
}

export default App;
