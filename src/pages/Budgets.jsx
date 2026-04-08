import { Title } from "../components/UI/Title";
import { BudgetCard } from "../components/UI/BudgetCard";
import data from "../data/data.json";
import { BudgetPieChart } from "../components/UI/BudgetPieChart";
const budgets = data.budgets;
import { AddEditBudgetModal } from "../components/UI/AddEditBudgetModal";
import { useState } from "react";
import { Button } from "../components/UI/Button";

export const Budgets = () => {
  const getLatest3 = (category) => {
    return data.transactions
      .filter((item) => item.category === category)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  };

  const totalSpentForEachCategory = (category) => {
    return data.transactions
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  };
  const totalSpent = budgets.reduce(
    (sum, item) => sum + Math.abs(totalSpentForEachCategory(item.category)),
    0,
  );

  const PieChartData = budgets.map((item) => ({
    name: item.category,
    value: Math.abs(totalSpentForEachCategory(item.category)),
    color: item.theme,
  }));
  const limit = budgets.reduce((sum, item) => sum + item.maximum, 0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const toggleModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  const usedThemes = budgets.map((item) => item.theme);
  const [mode, setMode] = useState();

  return (
    <div className="container d-flex flex-column gap-3 position-relative">
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
                onEdit={() => {
                  setMode("edit");
                  toggleModal();
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
    </div>
  );
};
