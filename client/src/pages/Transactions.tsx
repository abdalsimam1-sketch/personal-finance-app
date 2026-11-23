import { useState } from "react";
import { useGetTransactions } from "../hooks/transactions/useGetTransactions";
import filterPic from "../assets/icon-filter-mobile.svg";
import sort from "../assets/icon-sort-mobile.svg";
import searchIcon from "../assets/icon-search.svg";
import rigth from "../assets/icon-caret-right.svg";
import left from "../assets/icon-caret-left.svg";
import { formatDate } from "../utils/formatDate";
import { AddEditTransactionModal } from "../components/AddEditTransactionModal";
import { categoryOptions } from "../data/categories";
import { sortByOptions } from "../data/sortBy";

export const Transactions = () => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("newest");
  const [category, setCategory] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [addEditModalOpen, setAddEditModalOpen] = useState<boolean>(false);

  const { getTransactionsQuery } = useGetTransactions({
    page,
    limit,
    search,
    filter,
    category,
  });
  const transactions = getTransactionsQuery.data?.data?.transactions;

  const totalPages = getTransactionsQuery.data?.data?.totalPages;

  const next = () => {
    setPage((current) =>
      current >= 1 && current < totalPages ? current + 1 : current,
    );
  };
  const prev = () => {
    setPage((current) => (current > 1 ? current - 1 : current));
  };

  return (
    <div className="p-5 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-heading">Transactions</h1>
        <button
          className="bg-grey-900 p-1 px-3 text-white rounded cursor-pointer"
          onClick={() => setAddEditModalOpen(true)}
        >
          + Add transaction
        </button>
      </div>
      <div className="bg-white  p-5 rounded flex flex-col gap-5 md:min-h-[50rem] mb-20">
        <div className="flex gap-5 items-center">
          <div className="relative flex-1 max-w-80">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search transactions..."
              aria-label="Search transactions"
              type="text"
              className="w-full border-gray-300 focus:border-blue-100 focus:border-5 border-2 outline-0 rounded pl-2 p-1 "
            />
            <img
              src={searchIcon}
              alt="seacrh icon"
              className="absolute right-3 top-3"
            />
          </div>
          <div className="flex gap-5 items-center shrink-0 ml-auto">
            <div className="md:flex gap-5 hidden items-center">
              <label htmlFor="sort" className="text-captions  text-gray-500">
                Sort By
              </label>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
                id="sort"
                className="border border-gray-500 p-2  px-3 rounded outline-0"
              >
                {sortByOptions.map((item) => (
                  <option value={item.value} key={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative md:hidden sort-icon shrink-0">
              <img src={sort} alt="" />
              <select
                aria-label="Sort by"
                className="absolute inset-0 w-full h-full opacity-0"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
              >
                {sortByOptions.map((item) => (
                  <option value={item.value} key={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:flex gap-5 hidden items-center">
              <label htmlFor="category" className="text-captions text-gray-500">
                Category
              </label>
              <select
                id="category"
                className="border border-gray-500 p-2 px-3 rounded outline-0"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                {categoryOptions.map((item) => (
                  <option value={item.value} key={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative md:hidden shrink-0">
              <img src={filterPic} alt="" />
              <select
                aria-label="Filter by category"
                className="absolute inset-0 w-full h-full opacity-0"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                {categoryOptions.map((item) => (
                  <option value={item.value} key={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200"></div>
        <div className="transactions-desktop hidden md:block">
          <div className="head grid grid-cols-[3fr_1.5fr_1.5fr_auto] gap-4 text-gray-500">
            <p>Recipient/Sender</p>
            <p>Category</p>
            <p>Date</p>
            <p>Amount</p>
          </div>
          <div className="border-b border-gray-200"></div>
          {transactions?.length > 0 ? (
            <div>
              {transactions?.map((item: any) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[3fr_1.5fr_1.5fr_auto] gap-4 border-b border-gray-200 py-4"
                >
                  <p className="font-bold">{item.name}</p>
                  <p className="capitalize text-gray-500">{item.category}</p>
                  <p className="text-gray-500">{formatDate(item.date)}</p>
                  <p
                    className={`${item.type === "addition" ? "text-green" : "text-red"} font-bold`}
                  >
                    {item.type === "addition" ? "+" : "-"} ₦
                    {Number(item.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[10rem]">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>

        {transactions?.length < 1 ? (
          <div className="flex items-center justify-center min-h-[10rem] md:hidden">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div className="transactions-mobile md:hidden">
            {transactions?.map((item: any) => (
              <div
                key={item.id}
                className="flex  justify-between border-b border-gray-200 py-1"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="capitalize text-captions text-gray-500">
                    {item.category}
                  </p>
                </div>
                <div>
                  <p
                    className={`${item.type === "addition" ? "text-green" : "text-red"} font-bold`}
                  >
                    {item.type === "addition" ? "+" : "-"} ₦
                    {Number(item.amount).toLocaleString()}
                  </p>
                  <p className="text-captions text-gray-500">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {transactions?.length > 0 && (
          <div className="flex gap-5 items-center justify-end mt-auto">
            <button onClick={prev} className="cursor-pointer">
              <img src={left} alt="" />
            </button>
            <p>
              {page} of {totalPages}
            </p>
            <button onClick={next} className="cursor-pointer">
              <img src={rigth} alt="" />
            </button>
          </div>
        )}
      </div>
      {addEditModalOpen && (
        <AddEditTransactionModal
          modalOpen={addEditModalOpen}
          closeModal={() => setAddEditModalOpen(false)}
        />
      )}
    </div>
  );
};
