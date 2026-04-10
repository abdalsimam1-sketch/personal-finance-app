import { useState, useEffect, useContext, createContext } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const valuesToBeShared = {};
  return (
    <FinanceContext.Provider value={valuesToBeShared}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  return useContext(FinanceContext);
};
