import React from 'react';
import * as DEFAULT_STATE from './DefaultState';

export type ContextState = ReturnType<typeof useAppContextProvider>;
// @ts-ignore
export const AppContext = React.createContext<ContextState>(null);

export const useAppContext = () => React.useContext(AppContext);

export const useAppContextProvider = () => {
  const [state, setState] = React.useState(DEFAULT_STATE.initialState);

  return {
    state,
    setState,
  };
};
// @ts-ignore
export const AppContextProvider = ({ children }) => {
  const context = useAppContextProvider();

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
