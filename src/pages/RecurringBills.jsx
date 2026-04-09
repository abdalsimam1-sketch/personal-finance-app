import React, { useState } from "react";
import { Title } from "../components/UI/Title";
import billsIcon from "../assets/images/icon-nav-recurring-bills.svg";
import { Input } from "../components/UI/Input";
import data from "../data/data.json";

import { CheckIfPaid } from "../HelperFunctions/CurrentDate";
import { suffix } from "../HelperFunctions/CurrentDate";
import paidIcon from "../assets/images/icon-bill-paid.svg";
import dueIcon from "../assets/images/icon-bill-due.svg";
import { Sort } from "../data/sortData";
import { sorting } from "../data/sortData";

export const RecurringBills = () => {
  const recurringBills = data.transactions.filter(
    (item) => item.recurring === true,
  );
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

  const [searchTerm, setSearchTerm] = useState("");
  const search = billsStatus.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  const sortedBills = sorting(selectedSort, search);

  return (
    <div className="container d-flex flex-column gap-3">
      <div className="mt-4">
        <Title>Recurring Bills</Title>
      </div>
      <main className="row g-3">
        <section className="col-12 col-lg-5 d-flex flex-column flex-md-row flex-lg-column gap-3">
          <div className="p-5 bg-dark card text-light w-100 ">
            <div className="d-flex gap-3 flex-md-column">
              <img
                src={billsIcon}
                alt="bills icon"
                style={{ width: "1.5rem" }}
              />
              <div>
                <span className="text-preset-2">Total Bills</span>{" "}
                <h1 className="text-preset-1">${totalBills}</h1>
              </div>
            </div>
          </div>
          <div className="card p-5 w-100 d-flex flex-column gap-3">
            <span className="text-preset-3">Summary</span>
            <div className="d-flex justify-content-between align-items-center text-preset-4 border-bottom">
              <span className="text-muted text-preset-4">Paid Bills</span>
              <span className="text-preset-3">
                {paid.length}(${totalPaid})
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center text-preset-4 border-bottom">
              <span className="text-muted">Total Upcoming</span>
              <span className="text-preset-3">
                {" "}
                {upComing.length}(${totalUpComing})
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center text-preset-4 border-bottom text-danger mb-3">
              {" "}
              <span>Due Soon</span>
              <span className="text-preset-3">
                {" "}
                {dueSoon.length}(${totalDue})
              </span>
            </div>
          </div>
        </section>
        <section className="col-12 col-lg-7 ">
          <div className="card p-3 d-flex flex-column gap-3">
            <section className="d-flex justify-content-between align-items-center">
              <Input
                variant="icon"
                placeholder="Search bills"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Input>

              <div
                className="d-none d-md-inline position-relative "
                style={{ cursor: "pointer" }}
                onClick={toggleMenu}
              >
                <span className="text-muted text-preset-5">Sort by</span>
                <div className="form-control d-flex gap-3 text-nowrap">
                  <span>{selectedSort}</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>

                {menuIsOpen && (
                  <div className="position-absolute start-0 p-3 bg-light rounded d-flex flex-column mt-2">
                    {Sort.map((item) => (
                      <div
                        className="btn"
                        key={item.name}
                        onClick={() => setSelectedSort(item.name)}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="d-md-none">
                <i
                  className="bi bi-sort-down btn fs-1 d-md-none"
                  style={{
                    transform: "translateY(18%)",
                  }}
                  onClick={toggleMenu}
                ></i>
                {menuIsOpen && (
                  <div
                    className="position-absolute end-0 p-3 bg-light rounded d-flex flex-column mt-2 text-nowrap"
                    style={{ left: "18rem", width: "7rem" }}
                  >
                    {Sort.map((item) => (
                      <div
                        className="btn"
                        key={item.name}
                        onClick={() => {
                          setSelectedSort(item.name);
                          setMenuIsOpen(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
            <section>
              <table className="table">
                <thead>
                  <tr className="text-muted">
                    <th className="d-none d-md-table-cell">Bill Title</th>
                    <th className="d-none d-md-table-cell">Due Date</th>
                    <th className="d-none d-md-table-cell">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBills.map((item, index) => (
                    <tr key={index} className="align-middle">
                      <td className="d-flex flex-column">
                        <span className="d-flex align-items-center gap-2">
                          <img
                            src={item.avatar}
                            alt={item.name + " avatar"}
                            style={{ width: "3rem", borderRadius: "50%" }}
                          />
                          {item.name}
                        </span>
                        <span className="d-md-none text-success text-preset-4">
                          Monthly-{new Date(item.date).getDate()}
                          {suffix(new Date(item.date).getDate())}
                          {item.status === "paid" ? (
                            <img src={paidIcon} alt="" className="ps-2" />
                          ) : item.status === "soon" ? (
                            <img src={dueIcon} alt="" className="ps-1" />
                          ) : (
                            item.status === "upcoming"
                          )}
                        </span>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <span className=" text-success text-preset-4">
                          Monthly-{new Date(item.date).getDate()}
                          {suffix(new Date(item.date).getDate())}
                          {item.status === "paid" ? (
                            <img src={paidIcon} alt="" className="ps-2" />
                          ) : item.status === "soon" ? (
                            <img src={dueIcon} alt="" className="ps-1" />
                          ) : (
                            item.status === "upcoming"
                          )}
                        </span>
                      </td>
                      <td
                        className={`${item.amount < 0 ? "text-danger" : ""} text-preset-3`}
                      >
                        {item.amount < 0 ? <span>-</span> : <span>+</span>}$
                        {Math.abs(item.amount)}
                      </td>
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
