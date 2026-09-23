import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/verify-email/:token" element={<VerifyEmail />}></Route>
      </Routes>
    </>
  );
}

export default App;
