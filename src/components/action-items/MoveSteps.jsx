import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const MoveSteps = () => {
  const { executeSingleAction } = useGameContext();

  const [steps, setSteps] = useState(10);

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
      draggable
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
