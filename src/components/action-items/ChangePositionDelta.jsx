/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";

const ChangePositionDelta = ({ changeType = "xDelta" }) => {
  const { executeSingleAction } = useGameContext();

  const [delta, setDelta] = useState({ xDelta: 0, yDelta: 0, angleDelta: 0 });

  const performAction = () => {
    console.log("CLICKING", delta);
    if (!(delta.xDelta || delta.yDelta || delta.angleDelta)) return;

    console.log("HELLO WORLD", changeType);

    const currentAction = {
      action: "changePositionDelta",
      params: {
        ...delta,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "changePositionDelta",
      params: {
        delta,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  const getLabel = (changeType) => {
    if (changeType === "xDelta") {
      return "x";
    }
    if (changeType === "yDelta") {
      return "y";
    }
    return "angle";
  };

  return (
    <button
      className="bg-[#4C97FE] rounded-sm flex flex-row items-center gap-[6px] text-[12px] focus:outline-none"
      onClick={performAction}
      draggable
      onDragStart={handleDragStart}
    >
      <span>Change {getLabel(changeType)} by</span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={delta[changeType]}
        onChange={(e) => {
          const deltaValue = Number(e.target.value);
          console.log("delta value", deltaValue, changeType);
          setDelta((prev) => ({ ...prev, [changeType]: deltaValue }));
        }}
      />
    </button>
  );
};

export default ChangePositionDelta;
