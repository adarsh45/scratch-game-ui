/* eslint-disable react/prop-types */
import { createContext, useCallback, useRef, useState } from "react";
import actionModules from "../helpers/motionModules";
import looksModules from "../helpers/looksModules";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [mousePointer, setMousePointer] = useState({ x: 0, y: 0 });
  const [spriteInfo, setSpriteInfo] = useState({
    x: 0,
    y: 0,
    angle: 0,
    width: 0,
    height: 0,
  });

  const [looksData, setLooksData] = useState({
    msg: "",
    time: 2,
    timerAvailable: false,
    show: true,
  });

  const [flows, setFlows] = useState([{ actions: [] }]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const executeSingleAction = useCallback((actionData = {}) => {
    switch (actionData.type) {
      case "motion":
        handleMotion(actionData);
        break;
      case "looks":
        handleLooks(actionData);
        break;
      default:
        handleMotion(actionData);
    }
  }, []);

  const handleMotion = (actionData) => {
    setSpriteInfo((currentSpriteInfo) => {
      const module = actionModules[actionData.action];
      const params = { ...actionData.params, mousePointer };

      const updatedSprite = module.call(
        { currentSpriteInfo, canvasRef },
        params
      );

      return { ...currentSpriteInfo, ...updatedSprite };
    });
  };

  const handleLooks = (actionData) => {
    const contextData = {
      spriteInfo,
      canvasRef,
    };
    setLooksData((currentLooks) => {
      const module = looksModules[actionData.action];
      const params = { ...actionData.params };
      const updatedLooks = module.call(contextData, params);

      return { ...currentLooks, ...updatedLooks };
    });
  };

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
        mousePointer,
        setMousePointer,
        looksData,
        setLooksData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
