import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";
import { useFlowsContext } from "../../contexts/useFlowsContext";

const MoveToAbsolutePosition = ({
  flowId,
  actionId,
  actionParams = {},
  role = "action",
}) => {
  const { executeSingleAction } = useGameContext();
  const { changeActionParamsInFlow } = useFlowsContext();

  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (role !== "flow") return;

    const newParams = { ...actionParams, ...selectedPosition };
    changeActionParamsInFlow(flowId, actionId, newParams);
  }, [selectedPosition]);

  const performAction = () => {
    if (!selectedPosition) return;

    const currentAction = {
      action: "changeValueTo",
      params: {
        ...selectedPosition,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "changeValueTo",
      params: {
        ...selectedPosition,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  return (
    <ActionItemButton
      className="bg-[#4C97FE]"
      // bubble event to parent if role is flow
      onClick={role === "flow" ? () => {} : performAction}
      draggable={role !== "flow"}
      onDragStart={handleDragStart}
    >
      <span>Go to</span>
      <span>x:&nbsp;</span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={selectedPosition.x}
        onChange={(e) =>
          setSelectedPosition((prev) => ({
            ...prev,
            x: Number(e.target.value),
          }))
        }
      />

      <span>y:&nbsp;</span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={selectedPosition.y}
        onChange={(e) =>
          setSelectedPosition((prev) => ({
            ...prev,
            y: Number(e.target.value),
          }))
        }
      />
    </ActionItemButton>
  );
};

export default MoveToAbsolutePosition;
