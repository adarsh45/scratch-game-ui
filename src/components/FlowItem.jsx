/* eslint-disable react/prop-types */
import { useFlowsContext } from "../contexts/useFlowsContext";
import FlowActionItem from "./FlowActionItem";

const FlowItem = ({ flowId, actions = [], position = {} }) => {
  const { addActionToFlow, setSelectedFlow, selectedFlow } = useFlowsContext();

  const handleNewFlowItemDrop = (e) => {
    e.stopPropagation();

    const data = e.dataTransfer.getData("actionData");
    if (!data) return;
    const actionData = JSON.parse(data);
    if (!actionData.id) actionData.id = crypto.randomUUID();
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
    <div
      key={flowId}
      className={`p-2 flex flex-col items-start flow-container absolute bg-transparent rounded-lg border-black ${
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
      {actions.map((actionData) => {
        return (
          <FlowActionItem
            key={actionData.id}
            flowId={flowId}
            actionData={actionData}
          />
        );
      })}
    </div>
  );
};

export default FlowItem;
