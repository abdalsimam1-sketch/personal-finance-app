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
  const editBudget = (category, maximum, theme) => {
    setBudgets((current) =>
      current.map((budget) =>
        budget.category === category
          ? {
              ...budget,
              maximum: Number(maximum) || budget.maximum,
              theme: theme.theme,
            }
          : budget,
      ),
    );
  };
  const deleteBudget = (category) => {
    setBudgets((current) => {
      return current.filter((item) => item.category !== category);
    });
  };
  const addPot = ({ name, target, theme }) => {
    const potExists = pots.findIndex((item) => {
      return item.name === name;
    });
    if (potExists === -1) {
      setPots((current) => [
        { name, target: Number(target) || 0, theme: theme.theme, total: 0 },
        ...current,
      ]);
    } else {
      return;
    }
  };
  const editPot = (name, target, theme) => {
    setPots((current) =>
      current.map((pot) =>
        pot.name === name
          ? {
              ...pot,
              target: Number(target) || pot.target,
              theme: theme.theme,
            }
          : pot,
      ),
    );
  };
  const deletePot = (name) => {
    setPots((current) =>
      current.filter((item) => {
        return item.name !== name;
      }),
    );
  };
  const addMoney = (name, amount) => {
    setPots((current) => {
      return current.map((pot) => {
        return pot.name === name ? { ...pot, total: pot.total + amount } : pot;
      });
    });
  };
  const withdrawMoney = (name, total) => {
    setPots((current) =>
      current.map((pot) =>
        pot.name === name ? { ...pot, total: pot.total - total } : pot,
      ),
    );
  };

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
