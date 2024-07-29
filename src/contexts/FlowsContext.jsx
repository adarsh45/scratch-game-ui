/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";

export const FlowsContext = createContext();

export const DEFAULT_FLOWS = [
  {
    actions: [
      {
        action: "moveNSteps",
        params: {
          steps: 25,
        },
      },
      {
        action: "moveNSteps",
        params: {
          steps: 100,
        },
      },
      {
        action: "moveNSteps",
        params: {
          steps: 25,
        },
      },
      {
        action: "changeSize",
        params: {
          sizeDelta: 100,
        },
      },

      {
        action: "changePositionDelta",
        params: {
          angleDelta: 30,
        },
      },

      {
        action: "changePositionDelta",
        params: {
          xDelta: -100,
          yDelta: 300,
        },
      },
      // {
      //   action: "glide",
      //   params: {
      //     endX: 100,
      //     endY: 200,
      //   },
      // },
    ],
  },
];

export const FlowsContextProvider = ({ children }) => {
  const [flows, setFlows] = useState([{ actions: [] }]);

  const addActionToFlow = useCallback((flowId, actionData, position) => {
    setFlows((prevFlows) => {
      const existingFlow = prevFlows.find((flow) => flow.id === flowId);

      if (existingFlow) {
        return prevFlows.map((flow) =>
          flow.id === flowId
            ? { ...flow, actions: [...flow.actions, actionData] }
            : flow
        );
      } else {
        return [...prevFlows, { id: flowId, actions: [actionData], position }];
      }
    });
  }, []);

  const changePositionOfFlow = useCallback((flowId, newPosition) => {
    setFlows((prevFlows) => {
      const existingFlow = prevFlows.find((flow) => flow.id === flowId);

      if (!existingFlow) return;

      return prevFlows.map((flow) => {
        if (flow.id === flowId) {
          return { ...flow, position: newPosition };
        }
        return flow;
      });
    });
  }, []);

  return (
    <FlowsContext.Provider
      value={{
        flows,
        setFlows,
        addActionToFlow,
        changePositionOfFlow,
      }}
    >
      {children}
    </FlowsContext.Provider>
  );
};
