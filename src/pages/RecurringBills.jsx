import React from "react";
import { Title } from "../components/UI/Title";
import billsIcon from "../assets/images/icon-nav-recurring-bills.svg";
export const RecurringBills = () => {
  return (
    <div className="container d-flex flex-column gap-3">
      <div className="mt-4">
        <Title>Recurring Bills</Title>
      </div>
      <main className="row g-md-3">
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
              <span className="text-muted">Due Soon</span>
              <span></span>
            </div>
          </div>
        </section>
        <section className="col-12 col-lg-7">
          <div className="card"></div>
        </section>
      </main>
    </div>
  );
};
