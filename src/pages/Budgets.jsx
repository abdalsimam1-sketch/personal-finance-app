import { Title } from "../components/UI/Title";
import { BudgetCard } from "../components/UI/BudgetCard";

import { BudgetPieChart } from "../components/UI/BudgetPieChart";
import { AddEditBudgetModal } from "../components/UI/AddEditBudgetModal";
import { useMemo, useState } from "react";
import { Button } from "../components/UI/Button";
import { DeleteModal } from "../components/UI/DeleteModal";
import { useFinance } from "../context/FinanceContext";
export const Budgets = () => {
  const {
    budgets,
    transactions,
    totalSpent,
    totalSpentForEachCategory,
    PieChartData,
    limit,
  } = useFinance();
  const getLatest3 = useMemo(() => {
    return (category) => {
      return transactions
        .filter((item) => item.category === category)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    };
  }, [transactions]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const toggleModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  const usedThemes = budgets.map((item) => item.theme);
  const [mode, setMode] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDelete = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  const [selectedBudget, setSelectedBudget] = useState();

  return (
    <div className="container px-lg-4 d-flex flex-column gap-3 position-relative">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Title>Budgets</Title>
        <Button
          variant="primary"
          children="+ Add New Budget"
          onClick={() => {
            setMode("add");
            toggleModal();
          }}
        ></Button>
      </div>
      <div className="row align-items-start ">
        <section className="col-11 mx-auto col-md-5 card mb-3 p-5">
          <div className="mb-3">
            <BudgetPieChart
              data={PieChartData}
              TotalSpent={totalSpent}
              TotalLimit={limit}
            ></BudgetPieChart>
          </div>

          <div className="">
            <h2 className="text-preset-2">Spending Summary</h2>
            {budgets.map((item, index) => (
              <div className="d-flex justify-content-between mb-2" key={index}>
                <div className="d-flex gap-2 align-items-center">
                  <span
                    style={{
                      height: "1.5rem",
                      width: "3px",
                      backgroundColor: item.theme,
                    }}
                    className="rounded"
                  ></span>
                  <span className="text-preset-5 text-muted">
                    {item.category}
                  </span>
                </div>
                <div>
                  <span className="d-flex text-preset-5 gap-1">
                    <span className="fw-bold ">
                      $
                      {Math.abs(
                        totalSpentForEachCategory(item.category),
                      ).toFixed(2)}
                    </span>
                    <span className="text-muted">of ${item.maximum}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="col-12 col-md-7 min-vh-100 flex-grow-1">
          {budgets.map((item, index) => (
            <div className="d-flex flex-column mb-3" key={index}>
              <BudgetCard
                onDelete={() => {
                  toggleDelete();
                  setSelectedBudget(item);
                }}
                onEdit={() => {
                  setMode("edit");
                  toggleModal();
                  setSelectedBudget(item);
                }}
                maximum={item.maximum}
                theme={item.theme}
                category={item.category}
                percentage={Math.min(
                  Math.abs(
                    (totalSpentForEachCategory(item.category) / item.maximum) *
                      100,
                  ),
                  100,
                )}
                latest3={getLatest3(item.category)}
                spent={Math.abs(totalSpentForEachCategory(item.category))}
                remaining={Math.max(
                  item.maximum -
                    Math.abs(totalSpentForEachCategory(item.category)),
                  0,
                )}
              ></BudgetCard>
            </div>
          ))}
        </section>
      </div>

      {addModalOpen && (
        <AddEditBudgetModal
          mode={mode}
          onClose={toggleModal}
          usedThemes={usedThemes}
        ></AddEditBudgetModal>
      )}

      {deleteModalOpen && (
        <DeleteModal
          category={selectedBudget.category}
          onClose={toggleDelete}
          variant="budget"
        ></DeleteModal>
      )}
    </div>
  );
};
