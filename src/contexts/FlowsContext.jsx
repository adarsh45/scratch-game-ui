/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";

export const FlowsContext = createContext();

export const FlowsContextProvider = ({ children }) => {
  const [flows, setFlows] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState(null);

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
        selectedFlow,
        setSelectedFlow,
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
