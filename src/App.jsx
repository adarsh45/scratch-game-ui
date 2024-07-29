import "./App.css";
import ActionBar from "./components/ActionBar";
import FlowVisualizer from "./components/FlowVisualizer";
import GameCanvas from "./components/GameCanvas";
import { FlowsContextProvider } from "./contexts/FlowsContext";
import { GameContextProvider } from "./contexts/GameContext";

function App() {
  return (
    <main className="w-full h-full flex flex-row items-start justify-between p-4">
      <GameContextProvider>
        <section className="h-full">
          <ActionBar />
        </section>
        <section className="h-full">
          <FlowsContextProvider>
            <FlowVisualizer />
          </FlowsContextProvider>
        </section>
        <section className="h-full">
          <GameCanvas />
        </section>
      </GameContextProvider>
    </main>
  );
}

export default App;