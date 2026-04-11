import { useState, useEffect, useContext, createContext } from "react";
import data from "../data/data.json";
const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  //state
  const [balance, setBalance] = useState(data.balance);
  const [transactions, setTransactions] = useState(data.transactions);
  const [budgets, setBudgets] = useState(data.budgets);
  const [pots, setPots] = useState(data.pots);

  //actions
  const addBudget = ({ category, maximum, theme }) => {
    const budgetExists = budgets.find((item) => {
      return item.category === category;
    });
    if (budgetExists) {
      return;
    } else {
      setBudgets((current) => [
        {
          category,
          maximum: Number(maximum) || 0,
          theme: theme.theme,
        },
        ...current,
      ]);
    }
  };
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
