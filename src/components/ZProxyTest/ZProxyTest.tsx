import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { ZProxy } from "./ZProxy";
import { ZProxyContainer } from "./ZProxy.styles";
import { ButtonContainer, Button, Divider } from "../../App.styles";

type ModeType = "string" | "over" | "under";

const modes: ModeType[] = ["string", "over", "under"];

export default function ZProxyTest() {
  const [testMode, setTestMode] = useState("");

  const renderTestComponent = () => {
    switch (testMode) {
      case "string":
        return <PropIsString />;
      case "over":
        return <OverZIndex />;
      case "under":
        return <UnderZIndex />;
      default:
        null;
    }
  };

  return (
    <ZProxyContainer>
      <AppBase />
      <AppNav />
      <AuthAlert />
      <MaintainAlert />
      <SystemAlert />
      <Divider />
      <ButtonContainer>
        {modes.map((mode) => (
          <Button
            key={mode}
            onClick={() => setTestMode(mode)}
          >{`${mode} 조건 에러`}</Button>
        ))}
        <Divider />
      </ButtonContainer>
      <ErrorBoundary>{renderTestComponent()}</ErrorBoundary>
    </ZProxyContainer>
  );
}

const AppBase = () => {
  return <div style={{ zIndex: ZProxy.BASE }}>AppBase</div>;
};

const AppNav = () => {
  return <div style={{ zIndex: ZProxy.NAV }}>AppNav</div>;
};

const AuthAlert = () => {
  return <div style={{ zIndex: ZProxy.AUTH }}>AuthAlert</div>;
};

const MaintainAlert = () => {
  return <div style={{ zIndex: ZProxy.MAINTAIN }}>MaintainAlert</div>;
};

const SystemAlert = () => {
  return <div style={{ zIndex: ZProxy.SYSTEM }}>SystemAlert</div>;
};

const PropIsString = () => {
  return <div style={{ zIndex: ZProxy.asdf }}></div>;
};

const OverZIndex = () => {
  return <div style={{ zIndex: ZProxy[5001] }}>asdf</div>;
};

const UnderZIndex = () => {
  return <div style={{ zIndex: ZProxy[-1] }}>asdf</div>;
};
