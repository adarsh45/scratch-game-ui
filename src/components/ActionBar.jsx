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
  return (
    <div
      className="bg-[#fff] rounded-md overflow-y-auto p-4 h-full flex flex-col items-start justify-start gap-4 w-[20vw]"
      style={{
        maxHeight: "calc(100vh - 32px)",
        height: "calc(100vh - 32px)",
      }}
    >
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
      <SpriteVisibility show={true} />
      <SpriteVisibility show={false} />
    </div>
  );
};

export default ActionBar;
