import { Title } from "../components/UI/Title";
import { BudgetCard } from "../components/UI/BudgetCard";
export const Budgets = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Title>Budgets</Title>
        <button className="btn text-light bg-dark">+ Add New Budget</button>
      </div>
      <div className="row">
        <section className="col-12 col-md-5"></section>
        <section className="col-12 col-md-7 min-vh-100">
          <BudgetCard></BudgetCard>
        </section>
      </div>
    </div>
  );
};
