import React from "react";
import { Title } from "../components/UI/Title";
import { Input } from "../components/UI/Input";
export const Transactions = () => {
  return (
    <div className="px-3 d-flex flex-column gap-3 ">
      <section>
        <Title>Transactions</Title>
      </section>
      <section className="col-12 card p-4">
        <div className="filter-section d-flex justify-content-between align-items-center">
          <div>
            <Input placeholder="Search transaction" variant="icon"></Input>
          </div>
          <div className="d-flex gap-5 ">
            <div>
              <div className="d-none d-md-inline">
                <span className="text-muted text-preset-5">Sort by</span>
                <div className="form-control  d-flex justify-content-between  align-items-center gap-3">
                  <span className="text-preset-4"> Latest</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
              <i className=" btn bi bi-card-list m-0 d-md-none fs-2 "></i>
            </div>

            <div>
              <div className="d-none d-md-inline">
                <span className="text-muted text-preset-5">Category</span>
                <div className="form-control d-flex justify-content-between align-items-center gap-3">
                  <span className="text-preset-4"> All Transaction</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
              <i className="btn bi bi-funnel-fill m-0 d-md-none fs-2"></i>
            </div>
          </div>
        </div>
        <div className="table-title"></div>
        <div className="transaction-list"></div>
        <div className="pagination-section"></div>
      </section>
    </div>
  );
};
