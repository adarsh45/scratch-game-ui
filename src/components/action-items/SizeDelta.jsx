import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";

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
    <button
      className="bg-[#4C97FE] rounded-sm flex flex-row items-center gap-[6px] text-[12px] focus:outline-none"
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
    </button>
  );
};

export default SizeDelta;
