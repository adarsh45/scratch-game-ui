import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";
import { useFlowsContext } from "../../contexts/useFlowsContext";

const SizeDelta = ({
  flowId,
  actionId,
  actionParams = {},
  role = "action",
}) => {
  const { executeSingleAction } = useGameContext();
  const { changeActionParamsInFlow } = useFlowsContext();

  const [sizeDelta, setSizeDelta] = useState(actionParams.sizeDelta ?? 10);

  useEffect(() => {
    if (role !== "flow") return;

    const newParams = { ...actionParams, sizeDelta: Number(sizeDelta) };
    changeActionParamsInFlow(flowId, actionId, newParams);
  }, [sizeDelta]);

  const addActionToFlow = () => {
    if (!sizeDelta) return;

    const currentAction = {
      action: "changeSize",
      params: {
        sizeDelta,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "changeSize",
      params: {
        sizeDelta,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  return (
    <ActionItemButton
      className="bg-[#855CD6]"
      onClick={addActionToFlow}
      disabled={role === "flow"}
      draggable={role !== "flow"}
      onDragStart={handleDragStart}
    >
      <span>Change size by </span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={sizeDelta}
        onChange={(e) => setSizeDelta(Number(e.target.value))}
      />
    </ActionItemButton>
  );
};

export default SizeDelta;
