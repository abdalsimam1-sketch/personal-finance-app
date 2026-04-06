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
                percentage={item.maximum / 100}
                latest3={getLatest3(item.category)}
              ></BudgetCard>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
