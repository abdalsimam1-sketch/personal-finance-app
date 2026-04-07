import React from "react";
import { Title } from "../components/UI/Title";
import billsIcon from "../assets/images/icon-nav-recurring-bills.svg";
import { Input } from "../components/UI/Input";
import data from "../data/data.json";
import { FormatDate } from "../HelperFunctions/DateFormat";
export const RecurringBills = () => {
  const recurringBills = data.transactions.filter(
    (item) => item.recurring === true,
  );
  return (
    <div className="container d-flex flex-column gap-3">
      <div className="mt-4">
        <Title>Recurring Bills</Title>
      </div>
      <main className="row g-3">
        <section className="col-12 col-lg-5 d-flex flex-column flex-md-row flex-lg-column gap-3">
          <div className="p-3 bg-dark card text-light w-100 ">
            <div className="d-flex gap-3 flex-md-column">
              <img
                src={billsIcon}
                alt="bills icon"
                style={{ width: "1.5rem" }}
              />
              <div className="">
                <span>Total Bills</span> <h1>$</h1>
              </div>
            </div>
          </div>
          <div className="card p-3 w-100 d-flex flex-column gap-3">
            <span>Summary</span>
            <div className="d-flex justify-content-between align-items-center text-preset-4 border-bottom">
              <span className="text-muted">Paid Bills</span>
              <span></span>
            </div>
            <div className="d-flex justify-content-between align-items-center text-preset-4 border-bottom">
              {" "}
              <span className="text-muted">Total Upcoming</span>
              <span></span>
            </div>
            <div className="d-flex justify-content-between align-items-center text-preset-4 border-bottom">
              {" "}
              <span className="text-danger">Due Soon</span>
              <span></span>
            </div>
          </div>
        </section>
        <section className="col-12 col-lg-7 ">
          <div className="card p-3 d-flex flex-column gap-3">
            <section className="d-flex justify-content-between">
              <Input variant="icon"></Input>
              <div>
                <span className="text-muted text-preset-5">Sort by</span>
                <div className="form-control d-flex gap-3 text-nowrap">
                  <span>Latest</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
            </section>
            <section>
              <table className="table">
                <thead>
                  <tr className="text-muted">
                    <th>Bill Title</th>
                    <th className="d-none d-md-table-cell">Due Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="">
                  {recurringBills.map((item) => (
                    <tr key={item.amount} className="align-middle">
                      <td className="d-flex align-items-center gap-2">
                        <img
                          src={item.avatar}
                          alt={item.name + " avatar"}
                          style={{ width: "3rem", borderRadius: "50%" }}
                        />
                        {item.name}
                      </td>
                      <td className="d-none d-md-table-cell">
                        {FormatDate(item.date)}
                      </td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};
