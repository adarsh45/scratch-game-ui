/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const DrawMessage = ({ type = "say", timerAvailable = true }) => {
  const { executeSingleAction } = useGameContext();

  const [msg, setMsg] = useState("hello");
  const [time, setTime] = useState(2);

  const performAction = () => {
    if (!msg) return;

    const currentAction = {
      type: "looks",
      action: "showMessage",
      params: {
        timerAvailable,
        msg,
        time,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      type: "looks",
      action: "showMessage",
      params: {
        timerAvailable,
        msg,
        time,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  return (
    <ActionItemButton
      className="bg-[#855CD6]"
      onClick={performAction}
      draggable
      onDragStart={handleDragStart}
    >
      <span>{type}</span>
      <input
        type="text"
        className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      {timerAvailable && (
        <>
          <span>&nbsp;for&nbsp;</span>
          <input
            type="number"
            className="bg-[#fff] text-[#000] w-[36px] rounded-lg text-center hide-arrows focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <span>&nbsp;seconds</span>
        </>
      )}
    </ActionItemButton>
  );
};

export default DrawMessage;
