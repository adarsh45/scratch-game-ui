import { useFlowsContext } from "../contexts/useFlowsContext";
import DeleteIcon from "../assets/bin-icon.svg";

const DeleteZone = ({ showDeleteZone, setShowDeleteZone }) => {
  const { handleFlowDelete } = useFlowsContext();

  const handleDeleteFlow = (e) => {
    e.stopPropagation();

    const type = e.dataTransfer.getData("type");
    const flowId = e.dataTransfer.getData("flowId");

    if (type !== "existingFlow" || !flowId) return;

    handleFlowDelete(flowId);
    setShowDeleteZone(false);
  };

  return (
    showDeleteZone && (
      <button
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDeleteFlow}
        className="rounded-full text-white bg-red-600 opacity-60 p-[36px] absolute bottom-0 right-0 w-[150px] h-[150px] flex flex-row items-center justify-center"
      >
        <img src={DeleteIcon} alt="delete" width={40} height={40} />
      </button>
    )
  );
};

export default DeleteZone;
