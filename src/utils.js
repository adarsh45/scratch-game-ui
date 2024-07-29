function moveNSteps(params = {}) {
  const currentSpriteInfo = this;
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
    // console.log("ANIMATE:", counter++);
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
  const currentSpriteInfo = this;
  const { sizeDelta } = params;

  if (isNaN(sizeDelta)) {
    console.error("sizeDelta is invalid number", params);
    return currentSpriteInfo;
  }

  console.log("SIZE DELTA", sizeDelta);

  return {
    ...currentSpriteInfo,
    width: currentSpriteInfo.width + sizeDelta,
    height: currentSpriteInfo.height + sizeDelta,
  };
}

function changePositionDelta(params = {}) {
  const currentSpriteInfo = this;
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

const actionModules = { moveNSteps, changeSize, glide, changePositionDelta };

export default actionModules;
