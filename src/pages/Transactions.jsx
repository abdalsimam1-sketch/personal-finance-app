import React from "react";
import { Title } from "../components/UI/Title";
export const Transactions = () => {
  return (
    <div className="px-3 d-flex flex-column gap-3 ">
      <section>
        <Title>Transactions</Title>
      </section>
      <section className="col-12 card p-4">
        <div className="filter-section"></div>
        <div className="table-title"></div>
        <div className="transaction-list"></div>
        <div className="pagination-section"></div>
      </section>
    </div>
  );
};
