import { useState, useEffect, useContext, createContext } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  //state
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState();
  const [budgets, setBudgets] = useState();
  const [pots, setPots] = useState();

  //actions
  const addBudget = () => {};
  const editBudget = () => {};
  const deleteBudget = () => {};
  const addPot = () => {};
  const editPot = () => {};
  const deletePot = () => {};
  const addMoney = () => {};
  const withdrawMoney = () => {};

  const valuesToBeShared = {
    balance,
    transactions,
    budgets,
    pots,
    addBudget,
    editBudget,
    deleteBudget,
    addPot,
    editPot,
    deletePot,
    addMoney,
    withdrawMoney,
  };
  return (
    <FinanceContext.Provider value={valuesToBeShared}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  return useContext(FinanceContext);
};
