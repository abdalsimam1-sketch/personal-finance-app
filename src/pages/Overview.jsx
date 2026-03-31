import React from "react";
import { Title } from "../components/UI/Title";
import data from "../data/data.json";
import { BalanceCard } from "../components/UI/BalanceCard";
import { Link } from "react-router-dom";
import PotsImage from "../assets/images/icon-nav-pots.svg";

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

  const potsTotal = data.pots.reduce((sum, pot) => sum + pot.total, 0);

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

      <section>
        <div className="row">
          <div className="col-left col-12 col-lg-6">
            <section className="pots-section card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-preset-2">Pots</h2>
                <Link to="/pots" className="text-decoration-none">
                  <span className="text-preset-5 text-muted">
                    See Details
                    <i className="bi bi-caret-right-fill"></i>
                  </span>
                </Link>
              </div>
              <div>
                <div className="card col-4 pots-total p-4">
                  <div className="d-flex align-items-center gap-3 ">
                    <img
                      src={PotsImage}
                      alt="pots-image"
                      style={{ width: "1.4rem" }}
                    />
                    <div className="d-flex flex-column">
                      <span className="text-preset-5 text-muted">
                        Total Saved
                      </span>
                      <h1 className="text-preset-1 m-0">
                        <span>$</span>
                        {potsTotal}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
            </section>
            <section className="transactions-section card"></section>
          </div>
          <div className="col-right col-12 col-lg-6">
            <section className="budgets-section card"></section>
            <section className="bills-section card"></section>
          </div>
        </div>
      </section>
    </div>
  );
};
