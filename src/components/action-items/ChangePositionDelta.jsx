/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const ChangePositionDelta = ({ changeType = "xDelta" }) => {
  const { executeSingleAction } = useGameContext();

  const [delta, setDelta] = useState({ xDelta: 0, yDelta: 0, angleDelta: 0 });

  const performAction = () => {
    if (!(delta.xDelta || delta.yDelta || delta.angleDelta)) return;

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
        ...delta,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  const getLabel = (changeType) => {
    if (changeType === "xDelta") {
      return "Change x";
    }
    if (changeType === "yDelta") {
      return "Change y";
    }
    return "Turn";
  };

  return (
    <ActionItemButton
      className="bg-[#4C97FE]"
      onClick={performAction}
      draggable
      onDragStart={handleDragStart}
    >
      <span>{getLabel(changeType)} by</span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={delta[changeType]}
        onChange={(e) => {
          const deltaValue = Number(e.target.value);
          setDelta((prev) => ({ ...prev, [changeType]: deltaValue }));
        }}
      />
    </ActionItemButton>
  );
};

export default ChangePositionDelta;
