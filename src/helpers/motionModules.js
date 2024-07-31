function moveNSteps(params = {}) {
  const { currentSpriteInfo } = this;
  const { x, y, angle } = currentSpriteInfo;
  const { steps } = params;

  if (isNaN(steps)) {
    console.error("Invalid steps count passed:", params);
    return currentSpriteInfo;
  }
  const thetaRadians = angle * (Math.PI / 180);

  const deltaX = steps * Math.cos(thetaRadians);
  const deltaY = steps * Math.sin(thetaRadians);

  const xNew = x + deltaX;
  const yNew = y + deltaY;

  return { ...currentSpriteInfo, x: xNew, y: yNew };
}

function glide(params = {}) {
  const { changeImagePosition, currentImagePosition } = this;
  const { x: startX, y: startY } = currentImagePosition;
  const { endX, endY } = params;

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const frames = 60; // Number of frames for the animation
  // const interval = duration / frames;

  let frame = 0;

  function animate() {
    frame++;
    const progress = frame / frames;
    const newX = startX + deltaX * progress;
    const newY = startY + deltaY * progress;

    changeImagePosition((prev) => ({ ...prev, x: newX, y: newY }));

    if (frame < frames) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function changeSize(params = {}) {
  const { currentSpriteInfo } = this;
  const { sizeDelta } = params;

  if (isNaN(sizeDelta)) {
    console.error("sizeDelta is invalid number", params);
    return currentSpriteInfo;
  }

  return {
    ...currentSpriteInfo,
    width: currentSpriteInfo.width + sizeDelta,
    height: currentSpriteInfo.height + sizeDelta,
  };
}

function changePositionDelta(params = {}) {
  const { currentSpriteInfo } = this;
  const { angle, x, y } = currentSpriteInfo;
  const { angleDelta = 0, xDelta = 0, yDelta = 0 } = params;

  if (isNaN(angleDelta)) {
    console.error("sizeDelta is invalid number", params);
    return;
  }

  return {
    ...currentSpriteInfo,
    angle: angle + angleDelta,
    x: x + xDelta,
    y: y + yDelta,
  };
}

function changeValueTo(params = {}) {
  const { currentSpriteInfo } = this;
  const newParams = {};

  Object.keys(params).forEach((key) => {
    if (!isNaN(params[key])) {
      newParams[key] = params[key];
    }
  });

  return { ...currentSpriteInfo, ...newParams };
}

function changePositionTo(params = {}) {
  const { currentSpriteInfo, canvasRef } = this;
  const goTo = params["selectedPosition"];

  const newParams = {};
  if (goTo === "random") {
    const maxXpos = canvasRef.current.width - currentSpriteInfo.width;
    const maxYpos = canvasRef.current.height - currentSpriteInfo.height;
    const xPos = Math.round(Math.random() * maxXpos);
    const yPos = Math.round(Math.random() * maxYpos);
    newParams["x"] = xPos;
    newParams["y"] = yPos;
  }

  return { ...currentSpriteInfo, ...newParams };
}

function bounceBack() {
  const { currentSpriteInfo, canvasRef } = this;

  const newParams = {};
  const maxXpos = canvasRef.current.width - currentSpriteInfo.width;
  const maxYpos = canvasRef.current.height - currentSpriteInfo.height;
  const minXpos = 0;
  const minYpos = 0;
  let xPos = currentSpriteInfo.x;
  let yPos = currentSpriteInfo.y;

  if (xPos < minXpos) xPos = minXpos;
  else if (xPos > maxXpos) xPos = maxXpos;

  if (yPos < minYpos) yPos = minYpos;
  else if (yPos > maxYpos) yPos = maxYpos;

  newParams["x"] = xPos;
  newParams["y"] = yPos;

  return { ...currentSpriteInfo, ...newParams };
}

const actionModules = {
  moveNSteps,
  changeSize,
  glide,
  changePositionDelta,
  changeValueTo,
  changePositionTo,
  bounceBack,
};

export default actionModules;
