import { Budgets } from "./pages/Budgets";
import { Overview } from "./pages/Overview";
import { Pots } from "./pages/Pots";
import { RecurringBills } from "./pages/RecurringBills";
import { Transactions } from "./pages/Transactions";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { LoginPage } from "./pages/LoginPage";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
function App() {
  return (
    <>
      <Routes>
        {/*  Public Routes */}
        <Route element={<PublicRoute></PublicRoute>}>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
        </Route>

        {/*  Protected Routes */}
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/app" element={<Layout></Layout>}>
            <Route index element={<Overview></Overview>}></Route>
            <Route path="budgets" element={<Budgets></Budgets>}></Route>
            <Route path="pots" element={<Pots></Pots>}></Route>
            <Route
              path="bills"
              element={<RecurringBills></RecurringBills>}
            ></Route>
            <Route
              path="transactions"
              element={<Transactions></Transactions>}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </>
  );
}

export default App;
