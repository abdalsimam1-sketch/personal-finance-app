import { Button } from "../components/UI/Button";
import { Sidebar } from "../components/Layout/Sidebar";
import { Input } from "../components/UI/Input";
import { MobileNav } from "../components/Layout/MobileNav";
import { BalanceCard } from "../components/UI/BalanceCard";
export const TestingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center p-5"
      style={{ width: "100%", height: "100vh" }}
    >
      <BalanceCard
        currency="$"
        label="Current Balance"
        amount="2,300.00"
        background="bg-dark"
      ></BalanceCard>
    </div>
  );
};
