import { useState } from "react";
import ZLayer from "./ZManager/ZLayer";
import ZProvider from "./ZManager/ZProvder";

function App() {
  return (
    <ZProvider>
      <Something />
      <Something />
      <Something />
      <Something />
      <Something />
      <Something />
      <Something />
      <Something />
      <Something />
      <Something />
    </ZProvider>
  );
}

const Something = () => {
  const [enter, setEnter] = useState(false);
  return (
    <div>
      <button onClick={() => setEnter((p) => !p)}>hi!</button>
      {enter && <ZLayer>asdf</ZLayer>}
    </div>
  );
};

export default App;
