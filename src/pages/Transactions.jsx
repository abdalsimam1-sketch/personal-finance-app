import React, { useState } from "react";
import { Title } from "../components/UI/Title";
import { Input } from "../components/UI/Input";
import data from "../data/data.json";
import { FormatDate } from "../HelperFunctions/DateFormat";
import { Sort } from "../data/sortData";
import { sorting } from "../data/sortData";
export const Transactions = () => {
  const [SortIsOpen, SetSortIsOpen] = useState(false);
  const [CategoryIsOpen, SetCategoryIsOpen] = useState(false);
  const [Search, SetSearch] = useState("");
  const [SelectedSort, SetSelectedSort] = useState("Latest");
  const [selectedCategory, setSelectedCategory] = useState("All Transactions");

  const toggleSort = () => {
    SetSortIsOpen(!SortIsOpen);
  };
  const toggleCategory = () => {
    SetCategoryIsOpen(!CategoryIsOpen);
  };
  const toggleSortMobile = () => {
    SetSortIsOpen((prev) => {
      const next = !prev;
      if (next) {
        SetCategoryIsOpen(false);
      }
      return next;
    });
  };

  const toggleCategoryMobile = () => {
    SetCategoryIsOpen((prev) => {
      const next = !prev;
      if (next) {
        SetSortIsOpen(false);
      }
      return next;
    });
  };

  const allCategories = data.transactions.map((item) => item.category);
  const UniqueCategories = [...new Set(allCategories)];
  const Categories = ["All Transactions", ...UniqueCategories];

  const filteredTransactions = data.transactions.filter((item) =>
    item.name.toLowerCase().includes(Search.trim().toLowerCase()),
  );

  const categorize = (selectedCategory) => {
    const prev = [...filteredTransactions];
    if (selectedCategory === "All Transactions") {
      return prev;
    } else {
      return prev.filter((item) => item.category === selectedCategory);
    }
    return prev;
  };
  const categoryTransactions = categorize(selectedCategory);

  const sortedTransactions = sorting(SelectedSort, categoryTransactions);
  return (
    <div className="px-3 d-flex flex-column gap-3 container justify-content-center h-100">
      <section>
        <Title>Transactions</Title>
      </section>
      <section
        className="col-12 card p-4 d-flex flex-column gap-3"
        onClick={() => {
          SetCategoryIsOpen(false);
          SetSortIsOpen(false);
        }}
      >
        <div className="filter-section d-flex justify-content-between align-items-center ">
          <div>
            <Input
              placeholder="Search transaction"
              variant="icon"
              value={Search}
              onChange={(e) => SetSearch(e.target.value)}
            ></Input>
          </div>
          <div className="d-flex gap-5 ">
            <div className="position-relative">
              <div
                className="d-none d-md-inline sort-dropdown"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSort();
                }}
              >
                <span className="text-muted text-preset-5">Sort by</span>
                <div className="form-control  d-flex justify-content-between  align-items-center gap-3">
                  <span className="text-preset-4">{SelectedSort}</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
              <i
                className=" btn bi bi-card-list m-0 d-md-none fs-2 "
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSortMobile();
                }}
                style={{ transform: "translateY(15%)" }}
              ></i>
              {SortIsOpen && (
                <div
                  className="sort-dropdown position-absolute mt-3 top-100 start-0 d-flex flex-column bg-light p-3 rounded"
                  style={{ width: "7rem" }}
                >
                  {Sort.map((item) => (
                    <div
                      key={item.name}
                      className="btn"
                      onClick={() => {
                        SetSelectedSort(item.name);
                        SetSortIsOpen(false);
                      }}
                    >
                      <span className="text-preset-4 text-nowrap">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="position-relative">
              <div
                className="d-none d-md-inline category-dropdown"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory();
                }}
              >
                <span className="text-muted text-preset-5">Category</span>
                <div className="form-control d-flex justify-content-between align-items-center gap-3">
                  <span className="text-preset-4">{selectedCategory}</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
              <i
                className="btn bi bi-funnel-fill m-0 d-md-none fs-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategoryMobile();
                }}
                style={{ transform: "translateY(15%)" }}
              ></i>
              {CategoryIsOpen && (
                <div
                  className="category-dropdown position-absolute mt-3 top-100 end-0 d-flex flex-column bg-light p-3 text-nowrap rounded "
                  style={{ width: "9rem" }}
                >
                  {Categories.map((item) => (
                    <div
                      key={item}
                      className="btn"
                      onClick={() => {
                        setSelectedCategory(item);
                        SetCategoryIsOpen(false);
                      }}
                    >
                      <span className="text-preset-4">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="transaction-list responsive-table">
          <table className="table table-striped align-middle ">
            <thead className="text-preset-4 text-muted">
              <tr>
                <th>Recipient/Sender</th>
                <th className="d-none d-md-table-cell">Category</th>
                <th className="d-none d-md-table-cell">Transaction Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((item, index) => (
                <tr key={index}>
                  <td className="d-flex gap-3 align-items-center ">
                    <img
                      src={item.avatar}
                      alt={item.name + " avatar"}
                      style={{ width: "3rem", borderRadius: "50%" }}
                    />
                    {item.name}
                  </td>
                  <td className="d-none d-md-table-cell">{item.category}</td>
                  <td className="d-none d-md-table-cell">
                    {FormatDate(item.date)}
                  </td>
                  <td
                    className={`${item.amount > 0 ? "text-success" : "text-danger"} fw-bold`}
                  >
                    {item.amount < 0 ? <span>-</span> : <span>+</span>}$
                    {Math.abs(item.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-section"></div>
      </section>
    </div>
  );
};
