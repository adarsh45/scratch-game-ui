import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const MoveToAbsolutePosition = () => {
  const { executeSingleAction } = useGameContext();

  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });

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
      onClick={performAction}
      draggable
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
