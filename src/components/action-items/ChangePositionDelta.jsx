import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/useGameContext";
import ActionItemButton from "../ActionItemButton";
import { useFlowsContext } from "../../contexts/useFlowsContext";

const ChangePositionDelta = ({
  flowId,
  actionId,
  actionParams = {},
  role = "action",
  changeType = "xDelta",
}) => {
  const { executeSingleAction } = useGameContext();
  const { changeActionParamsInFlow } = useFlowsContext();

  const [delta, setDelta] = useState({
    [changeType]: actionParams[changeType] ?? 0,
  });

  useEffect(() => {
    if (role !== "flow") return;

    const newParams = { ...actionParams, ...delta };
    changeActionParamsInFlow(flowId, actionId, newParams);
  }, [delta]);

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
      disabled={role === "flow"}
      draggable={role !== "flow"}
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
          setDelta({ [changeType]: deltaValue });
        }}
      />
    </ActionItemButton>
  );
};

export default ChangePositionDelta;
