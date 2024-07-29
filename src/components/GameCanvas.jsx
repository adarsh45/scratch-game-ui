import { useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import catSprite from "../assets/catsprite.svg";

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
  } = useGameContext();

  const drawSprite = (context, image, spriteInfo) => {
    const { x, y, angle, width, height } = spriteInfo;

    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate((angle * Math.PI) / 180);
    context.drawImage(image, -width / 2, -height / 2, width, height);
    context.restore();
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
      setSpriteInfo((prev) => ({
        ...prev,
        width: img.width,
        height: img.height,
      }));
    };
  }, []);

  return (
    <div>
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
