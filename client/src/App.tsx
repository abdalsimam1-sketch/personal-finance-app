import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { AuthLayout } from "./components/AuthLayout";
import { Overview } from "./pages/Overview";
import { VerifyAccount } from "./pages/VerifyAccount";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { PageNotFound } from "./pages/PageNotFound";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace></Navigate>}
        ></Route>
        <Route
          path="/verify-account/:token"
          element={<VerifyAccount />}
        ></Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          ></Route>
        </Route>
        <Route
          path="/overview"
          element={<ProtectedRoutes children={<Overview />} />}
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
