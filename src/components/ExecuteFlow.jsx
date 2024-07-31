import { useFlowsContext } from "../contexts/useFlowsContext";
import { useGameContext } from "../contexts/useGameContext";

const ExecuteFlow = () => {
  const { selectedFlow } = useFlowsContext();
  const { executeSingleFlow } = useGameContext();
  return (
    <div className="absolute top-4 left-4">
      <button
        className={`${selectedFlow ? "" : "cursor-not-allowed opacity-50"}`}
        disabled={!selectedFlow}
        onClick={() => executeSingleFlow(selectedFlow)}
      >
        Run
      </button>
    </div>
  );
};

export default ExecuteFlow;
