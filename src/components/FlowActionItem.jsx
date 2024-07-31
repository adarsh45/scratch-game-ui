import {
  BounceBack,
  ChangePositionDelta,
  MoveSteps,
  MoveToAbsolutePosition,
  MoveToPosition,
  SetSingleValue,
  SizeDelta,
} from "./action-items";
import { DrawMessage, SpriteVisibility } from "./looks-items";

const FlowActionItem = ({ flowId, actionData = {} }) => {
  const actionComponents = {
    moveNSteps: {
      Component: MoveSteps,
      props: {},
    },
    bounceBack: {
      Component: BounceBack,
      props: {},
    },
    changeSize: {
      Component: SizeDelta,
      props: {},
    },
    changePositionTo: {
      Component: MoveToPosition,
      props: {},
    },
    changePositionDelta: {
      Component: ChangePositionDelta,
      props: {
        changeType: Object.keys(actionData.params)?.[0],
      },
    },
    changeValueTo: {
      Component:
        Object.keys(actionData.params)?.length == 2
          ? MoveToAbsolutePosition
          : SetSingleValue,
      props: { changeType: Object.keys(actionData.params)?.[0] },
    },
    spriteVisibility: {
      Component: SpriteVisibility,
      props: { show: actionData.params.show },
    },
    showMessage: {
      Component: DrawMessage,
      props: { ...actionData.params },
    },
  };

  const { Component, props } = actionComponents[actionData.action];

  return (
    <Component
      role="flow"
      flowId={flowId}
      actionId={actionData.id}
      actionParams={actionData.params}
      {...props}
    />
  );
};

export default FlowActionItem;
