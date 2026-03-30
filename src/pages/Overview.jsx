import React from "react";
import { Title } from "../components/UI/Title";
import data from "../data/data.json";
import { BalanceCard } from "../components/UI/BalanceCard";

export const Overview = () => {
  const balanceData = [
    {
      label: "Current Balance ",
      amount: data.balance.current,
      background: "bg-dark",
      currency: "$",
    },
    {
      label: "Personal Income",
      amount: data.balance.income,
      background: "",
      currency: "$",
    },
    {
      label: "Expenses",
      amount: data.balance.expenses,
      background: "",
      currency: "$",
    },
  ];

  return (
    <div className="container px-3">
      <section>
        <Title children="Overview"></Title>
      </section>
      <section>
        <div className="row g-4">
          {balanceData.map((item, index) => (
            <div key={index} className="col-12 col-md-4">
              <BalanceCard
                background={item.background}
                currency={item.currency}
                amount={item.amount}
                label={item.label}
              ></BalanceCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
