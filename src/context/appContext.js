import React from "react";

export const AppContext = React.createContext({});

export const AppProvider = props => {
  const {children, value} = props;
  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
};