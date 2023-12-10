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
  return <ZLayer>asdf</ZLayer>;
};

export default App;
