/* eslint-disable react/prop-types */
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const SpriteVisibility = ({ role = "action", show = true }) => {
  const { executeSingleAction } = useGameContext();

  const performAction = () => {
    const currentAction = {
      type: "looks",
      action: "spriteVisibility",
      params: { show },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      type: "looks",
      action: "spriteVisibility",
      params: {
        show,
      },
    };
    const type = "actionData";
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(type, JSON.stringify(currentAction));
  };

  return (
    <ActionItemButton
      className="bg-[#855CD6]"
      // bubble event to parent if role is flow
      onClick={role === "flow" ? () => {} : performAction}
      draggable={role !== "flow"}
      onDragStart={handleDragStart}
    >
      <span>{show ? "show" : "hide"}</span>
    </ActionItemButton>
  );
};

export default SpriteVisibility;
