/* eslint-disable react/prop-types */
import { useFlowsContext } from "../contexts/useFlowsContext";
import { getActionLabel } from "../helpers/utils";

const FlowItem = ({ flowId, actions = [], position = {} }) => {
  const { addActionToFlow, setSelectedFlow, selectedFlow } = useFlowsContext();

  const handleNewFlowItemDrop = (e) => {
    e.stopPropagation();

    const data = e.dataTransfer.getData("actionData");
    if (!data) return;
    const actionData = JSON.parse(data);
    addActionToFlow(flowId, actionData);
  };

  const handleCurrentFlowDragout = (e) => {
    e.dataTransfer.setData("type", "existingFlow");
    e.dataTransfer.setData("flowId", flowId);
  };

  const handleSetCurrentFlow = async () => {
    setSelectedFlow({ id: flowId, actions, position });
  };

  return (
    <button
      key={flowId}
      className={`p-0 flex flex-col items-start flow-container absolute bg-transparent rounded-lg border-black ${
        selectedFlow?.id === flowId ? "border-2" : "border-0"
      }`}
      style={{
        top: position.y,
        left: position.x,
      }}
      onClick={handleSetCurrentFlow}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleNewFlowItemDrop}
      draggable
      onDragStart={handleCurrentFlowDragout}
    >
      {actions.map((actionData, index) => {
        return (
          <span
            className={`
              rounded-lg text-[12px] p-1 text-white m-0
              ${actionData.type === "looks" ? "bg-[#855CD6]" : "bg-[#4C97FE]"}`}
            key={JSON.stringify(actionData) + index}
          >
            <span>{getActionLabel(actionData)}</span>
          </span>
        );
      })}
    </button>
  );
};

export default FlowItem;
