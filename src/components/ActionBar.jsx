// import { useState } from "react";
import { useGameContext } from "../contexts/useGameContext";
// import actionModules from "../utils";
import ChangePositionDelta from "./action-items/ChangePositionDelta";
import MoveSteps from "./action-items/MoveSteps";
import SizeDelta from "./action-items/SizeDelta";

const ActionBar = () => {
  const { flows, executeSingleAction } = useGameContext();
  // const [flows, setFlows] = useState([{ actions: [] }]);

  // function glideImageTo(newPosition) {
  //   const { x: startX, y: startY } = spriteInfo;
  //   const { x: endX, y: endY } = newPosition;

  //   const deltaX = endX - startX;
  //   const deltaY = endY - startY;
  //   const frames = 60; // Number of frames for the animation
  //   // const interval = duration / frames;

  //   let frame = 0;

  //   function animate() {
  //     // console.log("ANIMATE:", counter++);
  //     frame++;
  //     const progress = frame / frames;
  //     const newX = startX + deltaX * progress;
  //     const newY = startY + deltaY * progress;

  //     setSpriteInfo((prev) => ({ ...prev, x: newX, y: newY }));

  //     if (frame < frames) {
  //       requestAnimationFrame(animate);
  //     }
  //   }

  //   requestAnimationFrame(animate);
  // }

  // function handleGlideAnimation() {
  //   glideImageTo({ x: 100, y: 50 });
  // }

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
    <div className="bg-[#fff] rounded-md m-4 p-4 h-full flex flex-col items-start justify-center gap-4">
      <button onClick={handleRun}>Run</button>
      <MoveSteps />
      <ChangePositionDelta changeType="xDelta" />
      <ChangePositionDelta changeType="yDelta" />
      <ChangePositionDelta changeType="angleDelta" />
      <SizeDelta />
    </div>
  );
};

export default ActionBar;
