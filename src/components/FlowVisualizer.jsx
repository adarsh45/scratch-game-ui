import { memo, useState } from "react";
import FlowItem from "./FlowItem";
import { useFlowsContext } from "../contexts/useFlowsContext";
import DeleteZone from "./DeleteZone";

const FlowVisualizer = () => {
  const { flows, addActionToFlow, changePositionOfFlow } = useFlowsContext();

  const [showDeleteZone, setShowDeleteZone] = useState(false);

  const handleNewFlowDrop = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const position = { x, y };

    const dropType = e.dataTransfer.getData("type");
    if (!dropType) {
      console.error("Invalid drop found!", e);
      return;
    }

    if (dropType === "actionData") {
      const data = e.dataTransfer.getData("actionData");
      const actionData = JSON.parse(data);
      if (!actionData.id) actionData.id = crypto.randomUUID();
      addActionToFlow(crypto.randomUUID(), actionData, position);
    } else if (dropType === "existingFlow") {
      const flowId = e.dataTransfer.getData("flowId");
      changePositionOfFlow(flowId, position);
    }
  };

  return (
    <div
      className="relative text-black bg-white rounded-lg w-[35vw]"
      style={{
        height: "calc(100vh - 32px)",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleNewFlowDrop}
    >
      {flows.length === 0 && (
        <span
          className="text-center text-gray-400 absolute top-[50%] left-[50%]"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          Drag and drop the actions from left here, then select and run them in
          sequence
        </span>
      )}
      {flows.map((flowData) => {
        return (
          <FlowItem
            key={flowData.id}
            flowId={flowData.id}
            actions={flowData.actions}
            position={flowData.position}
            setShowDeleteZone={setShowDeleteZone}
          />
        );
      })}

      <DeleteZone
        showDeleteZone={showDeleteZone}
        setShowDeleteZone={setShowDeleteZone}
      />
    </div>
  );
};

export default memo(FlowVisualizer);
