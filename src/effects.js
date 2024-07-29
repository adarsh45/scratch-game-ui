function moveNSteps(x, y, thetaDegrees, N) {
  // Convert angle from degrees to radians
  console.log("THETA:", thetaDegrees);
  const thetaRadians = thetaDegrees * (Math.PI / 180);

  // Calculate the change in coordinates
  const deltaX = N * Math.cos(thetaRadians);
  const deltaY = N * Math.sin(thetaRadians);

  console.log("DELTA:", deltaX, deltaY);

  // Calculate the new coordinates
  const xNew = x + deltaX;
  const yNew = y + deltaY;

  return { x: xNew, y: yNew, thetaDegrees };
}

function drawImageRotated(ctx, img, x, y, width, height, angle) {
  // Save the current context state (before rotation)
  ctx.save();

  // Move to the center of the image
  ctx.translate(x + width / 2, y + height / 2);

  // Rotate the canvas around the center of the image
  ctx.rotate((angle * Math.PI) / 180);

  // Draw the image with its center at the origin
  ctx.drawImage(img, -width / 2, -height / 2, width, height);

  // Restore the context to its original state (before rotation)
  ctx.restore();
}

export const motions = {
  move: function (canvas, spriteRef, spritePosition, steps = 10) {
    console.log("SPRITE REF", spriteRef.current);
    console.log("SPRITE", spritePosition.current);
    console.log("STEPS", steps);
    const ctx = canvas.getContext("2d");
    console.log("CTX", ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("POS: ", spritePosition.current);
    const { x: currentX, y: currentY, angle } = spritePosition.current;
    spritePosition.current = moveNSteps(currentX, currentY, angle, steps);
    console.log("NEW CORRDS:", spritePosition.current);
    // ctx.drawImage(
    //   spriteRef,
    //   spritePosition.current.x,
    //   spritePosition.current.y
    // );
    drawImageRotated(
      ctx,
      spriteRef.current,
      spritePosition.current.x,
      spritePosition.current.y,
      spriteRef.current.width,
      spriteRef.current.height,
      spritePosition.current.angle
    );
    return true;
  },
};
