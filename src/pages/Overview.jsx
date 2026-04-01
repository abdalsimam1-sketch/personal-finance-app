import React from "react";
import { Title } from "../components/UI/Title";
import data from "../data/data.json";
import { BalanceCard } from "../components/UI/BalanceCard";
import PotsIcon from "../assets/images/icon-nav-pots.svg";
import { SeeDetails } from "../components/UI/SeeDetails";
import { FormatDate } from "../HelperFunctions/DateFormat";
import { BudgetPieChart } from "../components/UI/BudgetPieChart";

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

  const TotalSpent = data.budgets.reduce(
    (sum, budget) => sum + budget.spent || 0,
    0,
  );

  const TotalLimit = data.budgets.reduce(
    (sum, budget) => sum + budget.maximum || 0,
    0,
  );

  const PieChartData = data.budgets.map((item) => ({
    name: item.category,
    value: item.maximum,
    color: item.theme,
    limit: item.spent,
  }));

  return (
    <div className="container px-3 d-flex flex-column gap-3">
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
          <section className="pots-section card p-4 mb-4">
            <SeeDetails
              SeeDetail="See Details"
              label="Pots"
              path="/pots"
            ></SeeDetails>
            <div className="row g-3">
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
              <div className="col-12 col-md-7">
                <div className="row g-3">
                  {data.pots.slice(0, 4).map((item, index) => (
                    <div className="col-6">
                      <div className="d-flex gap-2 ">
                        <div
                          className="rounded-pill"
                          style={{
                            width: "4px",
                            height: "2rem",
                            backgroundColor: item.theme,
                          }}
                        ></div>
                        <div className="d-flex flex-column">
                          <span className="text-muted text-preset-5">
                            {item.name}
                          </span>
                          <span className="fw-bold text-preset-4">
                            ${item.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="transactions-section  card p-4">
            <div>
              <SeeDetails
                label="Transactions"
                SeeDetail="See Details"
                path="/transactions"
              ></SeeDetails>
            </div>

            <div>
              {data.transactions.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex gap-3 align-items-center">
                    <img
                      src={item.avatar}
                      alt={item.avatar + " avatar"}
                      style={{ width: "3rem", borderRadius: "50%" }}
                    />
                    <span className="text-preset-4 fw-bold">{item.name}</span>
                  </div>
                  <div className="d-flex flex-column ">
                    <span
                      className={`${item.amount > 0 ? "text-success" : "text-danger"} text-preset-5 fw-bold`}
                    >
                      {item.amount > 0 ? <span>+</span> : <span>-</span>} $
                      {Math.abs(item.amount)}
                    </span>
                    <span className="text-preset-5 text-muted">
                      {FormatDate(item.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-right col-12 col-lg-6">
          <section className="budgets-section  card p-4">
            <div className="row g-5 ">
              <div className="col-12 col-md-6">
                <BudgetPieChart
                  data={PieChartData}
                  TotalLimit={TotalLimit}
                  TotalSpent={TotalSpent}
                ></BudgetPieChart>
              </div>

              <div className="col-12 col-md-6">
                <div className="row row-cols-2 row-cols-md-1 g-1 ">
                  {PieChartData.slice(0, 4).map((item) => (
                    <div
                      className="d-flex gap-2 align-items-center"
                      key={item.name}
                    >
                      <div
                        className="rounded-pill"
                        style={{
                          width: "4px",
                          height: "2rem",
                          backgroundColor: item.color,
                        }}
                      ></div>
                      <div className="d-flex flex-column">
                        <span className="tetx-preset-5 text-muted">
                          {item.name}
                        </span>
                        <span className="text-preset-4 fw-bold">
                          ${item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bills-section  card"></section>
        </div>
      </section>
    </div>
  );
};
