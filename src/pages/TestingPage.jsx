import { Button } from "../components/UI/Button";
import { Sidebar } from "../components/Layout/Sidebar";
import { Input } from "../components/UI/Input";
import { MobileNav } from "../components/Layout/MobileNav";
import { BalanceCard } from "../components/UI/BalanceCard";
import { SeeDetails } from "../components/UI/SeeDetails";
import { BillsSummary } from "../components/UI/BillsSummary";
export const TestingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center p-5 w-100"
      style={{ width: "100%", height: "100vh" }}
    >
      <BillsSummary
        label="paid"
        amount="100"
        color="var(--color-green)"
      ></BillsSummary>
    </div>
  );
};
