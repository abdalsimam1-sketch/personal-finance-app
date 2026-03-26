import { Budgets } from "./pages/Budgets";
import { Overview } from "./pages/Overview";
import { Pots } from "./pages/Pots";
import { RecurringBills } from "./pages/RecurringBills";
import { Transactions } from "./pages/Transactions";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Overview></Overview>}></Route>
          <Route path="/budgets" element={<Budgets></Budgets>}></Route>
          <Route path="/pots" element={<Pots></Pots>}></Route>
          <Route
            path="/bills"
            element={<RecurringBills></RecurringBills>}
          ></Route>
          <Route
            path="/transactions"
            element={<Transactions></Transactions>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
