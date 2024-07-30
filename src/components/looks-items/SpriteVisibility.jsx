/* eslint-disable react/prop-types */
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";

const SpriteVisibility = () => {
  const { executeSingleAction } = useGameContext();

  const performAction = () => {
    const currentAction = {
      type: "looks",
      action: "spriteVisibility",
      params: {
        show: false,
      },
    };

    executeSingleAction(currentAction);
  };

  const handleDragStart = (e) => {
    const currentAction = {
      type: "looks",
      action: "spriteVisibility",
      params: {
        show: false,
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
      <input type="checkbox" value="show" id="show-sprite" />{" "}
      <label htmlFor="show-sprite">Show</label>
    </ActionItemButton>
  );
};

export default SpriteVisibility;
