import { useState, useMemo, useContext, createContext, useEffect } from "react";
const FinanceContext = createContext();
import data from "../data/data.json";
import { CheckIfPaid } from "../HelperFunctions/CurrentDate";
import { supabase } from "../HelperFunctions/supabaseClient";
export const FinanceProvider = ({ children }) => {
  //state
  const [balance, setBalance] = useState(data.balance);
  const [transactions, setTransactions] = useState(data.transactions);
  const [budgets, setBudgets] = useState([]);
  const [pots, setPots] = useState([]);
  useEffect(() => {
    const fetchPots = async () => {
      const { data, error } = await supabase.from("Pots").select("*");
      if (error) {
        console.log(error);
      } else {
        setPots(data);
      }
    };
    const fetchBudgets = async () => {
      const { data, error } = await supabase.from("Budgets").select("*");
      if (error) {
        console.log(error);
      } else {
        setBudgets(data);
      }
    };
    fetchBudgets();
    fetchPots();
  }, []);
  //actions
  const addBudget = async ({ category, maximum, theme }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const budgetExists = budgets.find((item) => {
      return item.category === category;
    });
    if (budgetExists) {
      return;
    }
    const { error } = await supabase.from("Budgets").insert({
      category,
      maximum: Number(maximum),
      theme: theme.theme,
      user_id: user.id,
    });
    if (error) {
      console.log(error);
      return;
    }
    setBudgets((current) => [
      {
        category,
        maximum: Number(maximum) || 0,
        theme: theme.theme,
      },
      ...current,
    ]);
  };
  const editBudget = async (category, maximum, theme) => {
    const { error } = await supabase
      .from("Budgets")
      .update({ maximum: Number(maximum), theme: theme.theme })
      .eq("category", category);
    if (error) {
      console.log(error);
      return;
    }
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
  const deleteBudget = async (category) => {
    const { error } = await supabase
      .from("Budgets")
      .delete()
      .eq("category", category);
    if (error) {
      console.log(error);
      return;
    }
    setBudgets((current) => {
      return current.filter((item) => item.category !== category);
    });
  };
  const addPot = async ({ name, target, theme }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const potExists = pots.findIndex((item) => {
      return item.name === name;
    });
    if (potExists !== -1) {
      return;
    }
    const { data, error } = await supabase
      .from("Pots")
      .insert({
        name,
        target: Number(target),
        theme: theme.theme,
        total: 0,
        user_id: user.id,
      })
      .select();
    if (error) {
      console.log(error);
      return;
    } else {
      setPots((current) => [data[0], ...current]);
    }
  };
  const editPot = async (name, target, theme) => {
    const { error } = await supabase
      .from("Pots")
      .update({ target: Number(target), theme: theme.theme })
      .eq("name", name);
    if (error) {
      console.log(error);
      return;
    }
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
  const deletePot = async (name) => {
    const potToDelete = pots.find((pot) => pot.name === name);
    const { error } = await supabase.from("Pots").delete().eq("name", name);
    if (error) {
      console.log(error);
    }
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
  const addMoney = async (name, amount) => {
    const pot = pots.find((pot) => pot.name === name);
    const { error } = await supabase
      .from("Pots")
      .update({ total: pot.total + amount })
      .eq("name", name);
    if (error) {
      console.log(error);
      return;
    }

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
  const withdrawMoney = async (name, total) => {
    const pot = pots.find((pot) => pot.name === name);
    const { error } = await supabase
      .from("Pots")
      .update({ total: pot.total - total })
      .eq("name", name);
    if (error) {
      console.log(error);
      return;
    }
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
  const totalSpent = useMemo(() => {
    return budgets.reduce(
      (sum, item) => sum + Math.abs(totalSpentForEachCategory(item.category)),
      0,
    );
  }, [budgets, transactions]);

  const PieChartData = useMemo(() => {
    return budgets.map((item) => ({
      name: item.category,
      value: Math.abs(totalSpentForEachCategory(item.category)),
      color: item.theme,
    }));
  }, [budgets, transactions]);
  const limit = useMemo(() => {
    return budgets.reduce((sum, item) => sum + Number(item.maximum), 0);
  }, [budgets]);

  // recurring bills logic
  const recurringBills = useMemo(() => {
    return transactions.filter((item) => item.recurring === true);
  }, [transactions]);

  const billsStatus = useMemo(() => {
    return recurringBills.map((item) => ({
      ...item,
      status: CheckIfPaid(item.date),
    }));
  }, [recurringBills]);
  const paid = useMemo(() => {
    return billsStatus.filter((item) => item.status === "paid");
  }, [billsStatus]);
  const upComing = useMemo(() => {
    return billsStatus.filter((item) => item.status === "upcoming");
  }, [billsStatus]);
  const dueSoon = useMemo(() => {
    return billsStatus.filter((item) => item.status === "soon");
  }, [billsStatus]);

  const totalPaid = useMemo(() => {
    return paid.reduce((sum, item) => sum + Math.abs(item.amount), 0);
  }, [paid]);
  const totalUpComing = useMemo(
    () => upComing.reduce((sum, item) => sum + Math.abs(item.amount), 0),
    [upComing],
  );
  const totalDue = useMemo(() => {
    return dueSoon.reduce((sum, item) => sum + Math.abs(item.amount), 0);
  }, [dueSoon]);

  const totalBills = useMemo(() => {
    return recurringBills.reduce((sum, item) => sum + Math.abs(item.amount), 0);
  }, [recurringBills]);

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
