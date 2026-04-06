import { Title } from "../components/UI/Title";
import { BudgetCard } from "../components/UI/BudgetCard";
import data from "../data/data.json";
const budgets = data.budgets;

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

  return (
    <div className="container d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Title>Budgets</Title>
        <button className="btn text-light bg-dark">+ Add New Budget</button>
      </div>
      <div className="row ">
        <section className="col-12 col-md-5"></section>
        <section className="col-12 col-md-7 min-vh-100">
          {budgets.map((item) => (
            <div className="d-flex flex-column mb-3">
              <BudgetCard
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
    </div>
  );
};
