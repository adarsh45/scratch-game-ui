import { useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import catSprite from "../assets/catsprite.svg";
import ExecuteFlow from "./ExecuteFlow";

const GameCanvas = () => {
  const {
    canvasRef,
    image,
    setImage,
    spriteInfo,
    setSpriteInfo,
    isDragging,
    setIsDragging,
    dragOffset,
    setDragOffset,
    looksData,
    setLooksData,
  } = useGameContext();

  const drawSprite = (context, image, spriteInfo) => {
    const { x, y, angle, width, height } = spriteInfo;

    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate((angle * Math.PI) / 180);
    context.drawImage(image, -width / 2, -height / 2, width, height);
    context.restore();
  };

  const clearSpriteDrawing = (context, spriteInfo) => {
    const { x, y, width, height } = spriteInfo;
    // context.save();
    // context.translate(x + width / 2, y + height / 2);
    // context.rotate((angle * Math.PI) / 180);
    context.clearRect(x, y, width, height);
    // context.restore();
  };

  const drawMessage = (context, startPosition, looksData) => {
    let { x, y } = startPosition;
    const { msg } = looksData;
    context.font = "16px Arial";
    const textWidth = context.measureText(msg).width;

    // Define padding and box dimensions
    const padding = 10;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = 40;

    y = y - boxHeight;

    const canvasPos = {
      startX: 0,
      startY: 0,
      endX: canvasRef.current.width,
      endY: canvasRef.current.height,
    };
    if (x < canvasPos.startX) x = canvasPos.startX;
    else if (x > canvasPos.endX) x = canvasPos.endX - boxWidth;

    if (y < canvasPos.startY) y = canvasPos.startY;
    else if (y > canvasPos.endY) y = canvasPos.endY - boxHeight;

    context.clearRect(x, y, boxWidth, boxHeight);
    context.fillStyle = "white";
    context.fillRect(x, y, boxWidth, boxHeight);
    context.strokeStyle = "black";
    context.strokeRect(x, y, boxWidth, boxHeight);
    context.fillStyle = "black";
    context.fillText(msg, x + padding, y + boxHeight / 2 + 6);

    return { x, y, boxWidth, boxHeight };
  };

  const clearMessageBox = (context, msgPosition) => {
    const { x, y, boxWidth, boxHeight } = msgPosition;
    context.clearRect(x - 2, y - 2, boxWidth + 4, boxHeight + 4);
    setLooksData((prev) => ({ ...prev, msg: "" }));
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      x >= spriteInfo.x &&
      x <= spriteInfo.x + spriteInfo.width &&
      y >= spriteInfo.y &&
      y <= spriteInfo.y + spriteInfo.height
    ) {
      setIsDragging(true);
      setDragOffset({ x: x - spriteInfo.x, y: y - spriteInfo.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpriteInfo((prev) => ({
      ...prev,
      x: x - dragOffset.x,
      y: y - dragOffset.y,
    }));
  };

  useEffect(() => {
    if (!image) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawSprite(ctx, image, spriteInfo);
  }, [image, spriteInfo]);

  useEffect(() => {
    if (!image) return;

    if (!looksData.msg) return;

    const ctx = canvasRef.current.getContext("2d");
    const startX = spriteInfo.x + spriteInfo.width;
    const startY = spriteInfo.y;
    const msgPosition = drawMessage(ctx, { x: startX, y: startY }, looksData);

    let timerId;
    if (looksData.timerAvailable) {
      timerId = setTimeout(() => {
        clearMessageBox(ctx, msgPosition);
      }, Number(looksData.time) * 1000);
    }

    return () => {
      if (!timerId) return;
      clearTimeout(timerId);
    };
  }, [image, spriteInfo, looksData]);

  useEffect(() => {
    if (!image) return;
    const ctx = canvasRef.current.getContext("2d");

    const showSprite = looksData.show;
    if (!showSprite) {
      clearSpriteDrawing(ctx, spriteInfo);
    } else {
      drawSprite(ctx, image, spriteInfo);
    }
  }, [image, spriteInfo, looksData.show]);

  useEffect(() => {
    // change canvas height and width
    canvasRef.current.width = document.documentElement.clientWidth * 0.4;
    const verticalMargin = 16 * 2;
    canvasRef.current.height =
      document.documentElement.clientHeight - verticalMargin;

    // load an image and set the image properties in state
    const img = new Image();
    img.src = catSprite;

    img.onload = () => {
      setImage(img);
      const midX = canvasRef.current.width / 2 - img.width / 2;
      const midY = canvasRef.current.height / 2 - img.height / 2;

      setSpriteInfo((prev) => ({
        ...prev,
        width: img.width,
        height: img.height,
        x: midX,
        y: midY,
      }));
    };
  }, []);

  return (
    <div className="relative">
      <ExecuteFlow />
      <canvas
        ref={canvasRef}
        className="bg-[#fff] rounded-md"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default GameCanvas;
