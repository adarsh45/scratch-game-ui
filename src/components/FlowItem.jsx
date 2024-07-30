/* eslint-disable react/prop-types */
import { useFlowsContext } from "../contexts/useFlowsContext";

const FlowItem = ({ flowId, actions = [], position = {} }) => {
  const { addActionToFlow } = useFlowsContext();

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

  return (
    <div
      className="flow-container absolute"
      style={{
        top: position.y,
        left: position.x,
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleNewFlowItemDrop}
      draggable
      onDragStart={handleCurrentFlowDragout}
    >
      <div>
        {actions.map((actionData, index) => {
          return (
            <div key={JSON.stringify(actionData) + index}>
              <p>{actionData.action}</p>
              <p>{JSON.stringify(actionData.params)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowItem;
