import React, { useEffect, useState } from "react";
import { Title } from "../components/UI/Title";
import { Input } from "../components/UI/Input";
import data from "../data/data.json";
import { FormatDate } from "../HelperFunctions/DateFormat";
export const Transactions = () => {
  const [SortIsOpen, SetSortIsOpen] = useState(false);
  const [CategoryIsOpen, SetCategoryIsOpen] = useState(false);
  const [Search, SetSearch] = useState("");
  const [SelectedSort, SetSelectedSort] = useState("Latest");
  const [selectedCategory, setSelectedCategory] = useState("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);

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

  const Sort = [
    {
      name: "Latest",
    },
    {
      name: "Oldest",
    },
    {
      name: "A-Z",
    },
    {
      name: "Z-A",
    },
    {
      name: "Highest",
    },
    {
      name: "Lowest",
    },
  ];

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

  const sorting = (SelectedSort) => {
    const prev = [...categoryTransactions];
    if (SelectedSort === "Oldest") {
      prev.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (SelectedSort === "Latest") {
      prev.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (SelectedSort === "A-Z") {
      prev.sort((a, b) => a.name.localeCompare(b.name));
    } else if (SelectedSort === "Z-A") {
      prev.sort((a, b) => b.name.localeCompare(a.name));
    } else if (SelectedSort === "Highest") {
      prev.sort((a, b) => b.amount - a.amount);
    } else if (SelectedSort === "Lowest") {
      prev.sort((a, b) => a.amount - b.amount);
    }
    return prev;
  };
  const sortedTransactions = sorting(SelectedSort);

  const transactionsPerPage = 7;
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => (page > 1 ? page - 1 : page));
    }
  };

  const next = () => {
    setCurrentPage((page) =>
      page < totalPages ? page + 1 : setCurrentPage(1),
    );
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [Search]);
  return (
    <div className="px-3 d-flex flex-column gap-3 justify-content-center container h-100">
      <section>
        <Title>Transactions</Title>
      </section>
      <section
        className="col-12 card p-4 d-flex flex-column gap-3 "
        onClick={() => {
          SetCategoryIsOpen(false);
          SetSortIsOpen(false);
        }}
        style={{ minHeight: "85vh" }}
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

        <div className="transaction-list responsive-table flex-grow-1">
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
              {sortedTransactions
                .slice(startIndex, endIndex)
                .map((item, index) => (
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
        <div className="pagination-section d-flex justify-content-between align-items-center">
          <div className="previous-section">
            <button
              className="btn prev-button px-2 d-flex gap-5 d-none d-md-flex"
              style={{
                border: "1px solid var(--color-beige-500)",
              }}
              onClick={prev}
            >
              <i className="bi bi-caret-left-fill "></i>
              Prev
            </button>
            <i
              className="bi bi-caret-left-fill d-md-none btn border"
              onClick={prev}
            ></i>
          </div>
          <div className="pages-section d-flex gap-2">
            {pageNumbers.map((button) => (
              <button
                key={button}
                className={`btn border ${currentPage === button ? "bg-dark text-light" : ""}`}
                onClick={() => setCurrentPage(button)}
              >
                {button}
              </button>
            ))}
          </div>
          <div className="next-section">
            <button
              className="btn prev-button px-2 d-flex gap-5 d-none d-md-flex"
              style={{
                border: "1px solid var(--color-beige-500)",
              }}
              onClick={next}
            >
              Next
              <i className="bi bi-caret-right-fill"></i>
            </button>
            <i
              className="bi bi-caret-right-fill d-md-none btn border"
              onClick={next}
            ></i>
          </div>
        </div>
      </section>
    </div>
  );
};
