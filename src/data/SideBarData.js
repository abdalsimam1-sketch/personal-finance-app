import budgets from "../assets/images/icon-nav-budgets.svg";
import overview from "../assets/images/icon-nav-overview.svg";
import pots from "../assets/images/icon-nav-pots.svg";
import bills from "../assets/images/icon-nav-recurring-bills.svg";
import transactions from "../assets/images/icon-nav-transactions.svg";

export const sidebar = [
  {
    icon: overview,
    name: "Overview",
    path: "/app",
  },
  {
    icon: transactions,
    name: "Transactions",
    path: "transactions",
  },
  {
    icon: budgets,
    name: "Budgets",
    path: "budgets",
  },

  {
    icon: pots,
    name: "Pots",
    path: "pots",
  },
  {
    icon: bills,
    name: "Recurring Bills",
    path: "bills",
  },
];
