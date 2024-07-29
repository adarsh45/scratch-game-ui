/* eslint-disable react/prop-types */
import { createContext, useCallback, useRef, useState } from "react";
import actionModules from "../utils";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [spriteInfo, setSpriteInfo] = useState({
    x: 0,
    y: 0,
    angle: 0,
    width: 0,
    height: 0,
  });

  const [flows, setFlows] = useState([{ actions: [] }]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const executeSingleAction = useCallback((actionData = {}) => {
    setSpriteInfo((currentSpriteInfo) => {
      const module = actionModules[actionData.action];
      console.log("CALLING METHOD", actionData.params);
      const params = actionData.params;
      const updatedSprite = module.call(currentSpriteInfo, params);
      console.log("UPDATED SPRITE:", updatedSprite);

      return { ...currentSpriteInfo, ...updatedSprite };
    });
  }, []);

  const addActionToFlow = useCallback((flowId, actionData) => {
    setFlows((prevFlows) => {
      const existingFlow = prevFlows.find((flow) => flow.id === flowId);

      if (existingFlow) {
        return prevFlows.map((flow) =>
          flow.id === flowId
            ? { ...flow, actions: [...flow.actions, actionData] }
            : flow
        );
      } else {
        return [...prevFlows, { id: flowId, actions: [actionData] }];
      }
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        canvasRef,
        image,
        setImage,
        spriteInfo,
        setSpriteInfo,
        flows,
        setFlows,
        isDragging,
        setIsDragging,
        dragOffset,
        setDragOffset,
        executeSingleAction,
        addActionToFlow,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
