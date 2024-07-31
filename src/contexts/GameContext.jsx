/* eslint-disable react/prop-types */
import { createContext, useCallback, useRef, useState } from "react";
import actionModules from "../helpers/motionModules";
import looksModules from "../helpers/looksModules";

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

  const [looksData, setLooksData] = useState({
    msg: "",
    time: 2,
    timerAvailable: false,
    show: true,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const executeSingleFlow = useCallback(async (flowData) => {
    const actions = flowData.actions;
    for (const actionData of actions) {
      executeSingleAction(actionData);
      await new Promise((res) => setTimeout(res, 500));
    }
  }, []);

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
      const params = { ...actionData.params };

      const updatedSprite = module.call(
        { currentSpriteInfo, canvasRef },
        params
      );

      return { ...currentSpriteInfo, ...updatedSprite };
    });
  };

  const handleLooks = (actionData) => {
    setLooksData((currentLooks) => {
      const contextData = {
        spriteInfo,
        canvasRef,
        currentLooks,
      };
      const module = looksModules[actionData.action];
      const params = { ...actionData.params };
      const updatedLooks = module.call(contextData, params);

      return { ...currentLooks, ...updatedLooks };
    });
  };

  return (
    <GameContext.Provider
      value={{
        canvasRef,
        image,
        setImage,
        spriteInfo,
        setSpriteInfo,
        isDragging,
        setIsDragging,
        dragOffset,
        setDragOffset,
        executeSingleAction,
        looksData,
        setLooksData,
        executeSingleFlow,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
