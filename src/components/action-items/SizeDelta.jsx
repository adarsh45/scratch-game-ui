import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const SizeDelta = () => {
  const { executeSingleAction } = useGameContext();

  const [sizeDelta, setSizeDelta] = useState(10);

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
      className="bg-[#4C97FE]"
      onClick={addActionToFlow}
      draggable
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
