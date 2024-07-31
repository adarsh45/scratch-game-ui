import { createContext, useCallback, useEffect, useState } from "react";

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

  const changeActionParamsInFlow = useCallback(
    (flowId, actionId, newParams = {}) => {
      setFlows((prevFlows) => {
        const existingFlow = prevFlows.find((flow) => flow.id === flowId);

        if (!existingFlow) return;

        const newActions = (existingFlow.actions || []).map((action) => {
          if (action.id === actionId) {
            return { ...action, params: newParams };
          }
          return action;
        });

        return prevFlows.map((flow) => {
          if (flow.id === flowId) {
            return { ...flow, actions: newActions };
          }
          return flow;
        });
      });
    },
    []
  );

  useEffect(() => {
    flows.forEach((flowData) => {
      if (flowData.id === selectedFlow?.id) {
        setSelectedFlow(flowData);
        return;
      }
    });
  }, [flows]);

  return (
    <FlowsContext.Provider
      value={{
        selectedFlow,
        setSelectedFlow,
        flows,
        setFlows,
        addActionToFlow,
        changePositionOfFlow,
        changeActionParamsInFlow,
      }}
    >
      {children}
    </FlowsContext.Provider>
  );
};
