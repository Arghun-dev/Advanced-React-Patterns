import { SplitScreen } from "./components/SplitScreen";

const Left = ({ title }: { title: string }) => (
  <h2 style={{ backgroundColor: "coral" }}>{title}</h2>
);

const Right = ({ title }: { title: string }) => (
  <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>
);

function App() {
  return (
    <SplitScreen leftWidth={1} rightWidth={3}>
      <Left title="I am Left!" />
      <Right title="I am Right!" />
    </SplitScreen>
  );
}

export default App;
