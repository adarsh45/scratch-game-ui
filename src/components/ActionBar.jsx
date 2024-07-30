import { useGameContext } from "../contexts/useGameContext";
import BounceBack from "./action-items/BounceBack";
import ChangePositionDelta from "./action-items/ChangePositionDelta";
import MoveSteps from "./action-items/MoveSteps";
import MoveToAbsolutePosition from "./action-items/MoveToAbsolutePosition";
import MoveToPosition from "./action-items/MoveToPosition";
import SetSingleValue from "./action-items/SetSingleValue";
import SizeDelta from "./action-items/SizeDelta";
import DrawMessage from "./looks-items/DrawMessage";
import SpriteVisibility from "./looks-items/SpriteVisibility";

const ActionBar = () => {
  const { flows, executeSingleAction } = useGameContext();

  async function executeFlow(flow = {}) {
    for (const item of flow.actions) {
      executeSingleAction(item);
      // this is not in original game, for better viewing, added time delay
      await new Promise((res) => setTimeout(res, 400));
    }
  }

  function handleRun() {
    if (!flows.length) return;

    const selectedFlow = flows[0];

    executeFlow(selectedFlow);
  }

  return (
    <div
      className="bg-[#fff] rounded-md overflow-y-auto p-4 h-full flex flex-col items-start justify-center gap-4 w-[20vw]"
      style={{
        maxHeight: "calc(100vh - 32px)",
      }}
    >
      <button onClick={handleRun}>Run</button>
      <MoveSteps />
      <ChangePositionDelta changeType="xDelta" />
      <ChangePositionDelta changeType="yDelta" />
      <ChangePositionDelta changeType="angleDelta" />
      <SizeDelta />
      <MoveToPosition />
      <MoveToAbsolutePosition />
      <SetSingleValue changeType="x" />
      <SetSingleValue changeType="y" />
      <SetSingleValue changeType="angle" />
      <BounceBack />
      <DrawMessage type="say" />
      <DrawMessage type="say" timerAvailable={false} />
      <DrawMessage type="think" />
      <DrawMessage type="think" timerAvailable={false} />
      <SpriteVisibility />
    </div>
  );
};

export default ActionBar;
