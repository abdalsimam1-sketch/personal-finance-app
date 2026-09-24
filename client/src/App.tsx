import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/verify-email/:token" element={<VerifyEmail />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
