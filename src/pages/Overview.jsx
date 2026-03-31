import React from "react";
import { Title } from "../components/UI/Title";
import data from "../data/data.json";
import { BalanceCard } from "../components/UI/BalanceCard";
import PotsIcon from "../assets/images/icon-nav-pots.svg";
import { SeeDetails } from "../components/UI/SeeDetails";

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

  const TotalPots = data.pots.reduce((sum, pot) => sum + pot.total, 0);

  return (
    <div className="container px-3 d-flex flex-column gap-5">
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

      <section className="row">
        <div className="col-left col-12 col-lg-6">
          <section className="pots-section card p-4 ">
            <SeeDetails
              SeeDetail="See Details"
              label="Pots"
              path="/pots"
            ></SeeDetails>
            <div className="col-12 col-md-5 card pots-total p-4">
              <div className="d-flex gap-3">
                <img
                  src={PotsIcon}
                  alt="pots icon"
                  style={{ width: "1.3rem" }}
                />
                <div>
                  <span className="text-preset-5">Total Saved</span>
                  <h1 className="text-preset-1">
                    <span>$</span>
                    {TotalPots}
                  </h1>
                </div>
              </div>
            </div>
            <div></div>
          </section>
          <section className="transactions-section  card"></section>
        </div>
        <div className="col-right col-12 col-lg-6">
          <section className="budgets-section  card"></section>
          <section className="bills-section  card"></section>
        </div>
      </section>
    </div>
  );
};
