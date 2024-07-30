/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const SetSingleValue = ({ changeType = "x" }) => {
  const { executeSingleAction } = useGameContext();

  const [val, setVal] = useState(0);

  const performAction = () => {
    const currentAction = {
      action: "changeValueTo",
      params: {
        [changeType]: val,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "changeValueTo",
      params: {
        [changeType]: val,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  const getLabel = (changeType) => {
    if (changeType === "x") {
      return "Set x to";
    }
    if (changeType === "y") {
      return "Set y to";
    }
    return "Point in direction";
  };

  return (
    <ActionItemButton
      className="bg-[#4C97FE]"
      onClick={performAction}
      draggable
      onDragStart={handleDragStart}
    >
      <span>{getLabel(changeType)}</span>
      <input
        type="number"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={val}
        onChange={(e) => {
          const inputValue = Number(e.target.value);
          setVal(inputValue);
        }}
      />
    </ActionItemButton>
  );
};

export default SetSingleValue;
