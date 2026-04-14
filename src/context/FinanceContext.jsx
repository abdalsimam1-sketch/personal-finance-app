import { useState, useEffect, useContext, createContext } from "react";
const FinanceContext = createContext();
import data from "../data/data.json";
import { CheckIfPaid } from "../HelperFunctions/CurrentDate";
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
    const potToDelete = pots.find((pot) => pot.name === name);
    if (potToDelete) {
      setBalance((current) => ({
        ...current,
        current: current.current + potToDelete.total,
      }));
    }
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
    setBalance((current) => ({
      ...current,
      current: current.current - amount,
    }));
  };
  const withdrawMoney = (name, total) => {
    setPots((current) =>
      current.map((pot) =>
        pot.name === name ? { ...pot, total: pot.total - total } : pot,
      ),
    );
    setBalance((current) => ({
      ...current,
      current: current.current + total,
    }));
  };

  //budget logic

  const totalSpentForEachCategory = (category) => {
    return transactions
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  };
  const totalSpent = budgets.reduce(
    (sum, item) => sum + Math.abs(totalSpentForEachCategory(item.category)),
    0,
  );

  const PieChartData = budgets.map((item) => ({
    name: item.category,
    value: Math.abs(totalSpentForEachCategory(item.category)),
    color: item.theme,
  }));
  const limit = budgets.reduce((sum, item) => sum + Number(item.maximum), 0);

  // recurring bills logic
  const recurringBills = transactions.filter((item) => item.recurring === true);
  const billsStatus = recurringBills.map((item) => ({
    ...item,
    status: CheckIfPaid(item.date),
  }));

  const paid = billsStatus.filter((item) => item.status === "paid");
  const upComing = billsStatus.filter((item) => item.status === "upcoming");
  const dueSoon = billsStatus.filter((item) => item.status === "soon");

  const totalPaid = paid.reduce((sum, item) => sum + Math.abs(item.amount), 0);
  const totalUpComing = upComing.reduce(
    (sum, item) => sum + Math.abs(item.amount),
    0,
  );
  const totalDue = dueSoon.reduce(
    (sum, item) => sum + Math.abs(item.amount),
    0,
  );

  const totalBills = recurringBills.reduce(
    (sum, item) => sum + Math.abs(item.amount),
    0,
  );

  const valuesToBeShared = {
    recurringBills,
    billsStatus,
    paid,
    upComing,
    dueSoon,
    totalPaid,
    totalDue,
    totalUpComing,
    totalBills,
    balance,
    transactions,
    budgets,
    pots,
    totalSpent,
    totalSpentForEachCategory,
    PieChartData,
    limit,
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
