import { memo } from "react";
import FlowItem from "./FlowItem";
import { useFlowsContext } from "../contexts/useFlowsContext";

const FlowVisualizer = () => {
  const { flows, addActionToFlow, changePositionOfFlow } = useFlowsContext();

  const handleNewFlowDrop = (e) => {
    const position = { x: e.clientX, y: e.clientY };

    const dropType = e.dataTransfer.getData("type");
    if (!dropType) {
      console.error("Invalid drop found!", e);
      return;
    }

    if (dropType === "actionData") {
      const data = e.dataTransfer.getData("actionData");
      const actionData = JSON.parse(data);
      addActionToFlow(crypto.randomUUID(), actionData, position);
    } else if (dropType === "existingFlow") {
      const flowId = e.dataTransfer.getData("flowId");
      changePositionOfFlow(flowId, position);
    }
  };

  return (
    <div
      className="text-black bg-white rounded-lg w-[35vw]"
      style={{
        height: "calc(100vh - 32px)",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleNewFlowDrop}
    >
      {flows.map((flowData) => {
        return (
          <FlowItem
            key={flowData.id}
            flowId={flowData.id}
            actions={flowData.actions}
            position={flowData.position}
          />
        );
      })}
    </div>
  );
};

export default memo(FlowVisualizer);
