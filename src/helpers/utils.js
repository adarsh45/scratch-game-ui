export const getActionLabel = (actionData) => {
  const params = actionData.params;
  let label = "";
  switch (actionData.action) {
    case "moveNSteps": {
      label = "move " + params.steps + " steps";
      break;
    }
    case "bounceBack": {
      label = "if on edge, bounce";
      break;
    }
    case "changeSize": {
      label = "change size by " + params.sizeDelta;
      break;
    }
    case "changePositionTo": {
      label = "go to " + params.selectedPosition + " position";
      break;
    }
    case "spriteVisibility": {
      label = params.show ? "show" : "hide";
      break;
    }
    case "showMessage": {
      label = "say " + params.msg;
      label += params.timerAvailable ? " for " + params.time + " seconds" : "";
      break;
    }

    case "changePositionDelta": {
      let extras = "";
      Object.keys(params).forEach(
        (key) => (extras += `${key.replace("Delta", "")} by ${params[key]} `)
      );
      label += "change " + extras;
      break;
    }
    case "changeValueTo": {
      const isOnlyItem = Object.keys(params).length === 1;
      if (isOnlyItem) {
        const key = Object.keys(params)[0];
        const val = params[key];
        if (key === "angle") {
          label += "point in direction " + val;
        } else {
          label += `set ${key} to ${val}`;
        }
      } else {
        let extras = "";
        Object.keys(params).forEach(
          (key) => (extras += `${key}: ${params[key]} `)
        );
        label += "go to " + extras;
      }
      break;
    }

    default:
      label = JSON.stringify(actionData);
      break;
  }
  return label;
};
