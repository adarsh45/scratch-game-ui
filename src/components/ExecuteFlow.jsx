import { useFlowsContext } from "../contexts/useFlowsContext";
import { useGameContext } from "../contexts/useGameContext";
import PlayIcon from "../assets/play-icon.svg";

const ExecuteFlow = () => {
  const { selectedFlow } = useFlowsContext();
  const { executeSingleFlow } = useGameContext();
  return (
    <div className="absolute top-4 left-4">
      <button
        className={`bg-transparent ${
          selectedFlow ? "" : "cursor-not-allowed opacity-50"
        }`}
        disabled={!selectedFlow}
        onClick={() => {
          executeSingleFlow(selectedFlow);
        }}
      >
        <img src={PlayIcon} alt="play-icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default ExecuteFlow;
