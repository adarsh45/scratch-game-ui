import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const MoveToPosition = () => {
  const { executeSingleAction } = useGameContext();

  const [selectedPosition, setSelectedPosition] = useState("random");

  const performAction = () => {
    if (!selectedPosition) return;

    const currentAction = {
      action: "changePositionTo",
      params: {
        selectedPosition,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "changePositionTo",
      params: {
        selectedPosition,
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
      draggable
      onDragStart={handleDragStart}
    >
      <span>Go to</span>
      <select
        className="bg-[#4C97FE] border-[#fff] border-[0.5px] rounded-md focus:outline-none"
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      >
        <option value="random">Random position</option>
        <option value="mousepointer">Mouse pointer</option>
      </select>
    </ActionItemButton>
  );
};

export default MoveToPosition;
