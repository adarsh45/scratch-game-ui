import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";
import { useFlowsContext } from "../../contexts/useFlowsContext";

const MoveSteps = ({
  flowId,
  actionId,
  actionParams = {},
  role = "action",
}) => {
  const { executeSingleAction } = useGameContext();
  const { changeActionParamsInFlow } = useFlowsContext();

  const [steps, setSteps] = useState(actionParams.steps ?? 10);

  useEffect(() => {
    if (role !== "flow") return;

    const newParams = { ...actionParams, steps: Number(steps) };
    changeActionParamsInFlow(flowId, actionId, newParams);
  }, [steps]);

  const performAction = () => {
    if (!steps) return;

    const currentAction = {
      action: "moveNSteps",
      params: {
        steps,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "moveNSteps",
      params: {
        steps,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  return (
    <ActionItemButton
      className="bg-[#4C97FE]"
      onClick={performAction}
      disabled={role === "flow"}
      draggable={role !== "flow"}
      onDragStart={handleDragStart}
    >
      <span>Move</span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />
      <span>steps</span>
    </ActionItemButton>
  );
};

export default MoveSteps;
