/* eslint-disable react/prop-types */
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const BounceBack = () => {
  const { executeSingleAction } = useGameContext();

  const performAction = () => {
    const currentAction = {
      action: "bounceBack",
      params: {},
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      action: "bounceBack",
      params: {},
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
      <span>If on edge, bounce</span>
    </ActionItemButton>
  );
};

export default BounceBack;
