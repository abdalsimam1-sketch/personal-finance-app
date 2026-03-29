import { Button } from "../components/UI/Button";
import { Sidebar } from "../components/Layout/Sidebar";
import { Input } from "../components/UI/Input";
export const TestingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center p-5"
      style={{ width: "100%", height: "100vh" }}
    >
      <Input
        placeholder="placeholder"
        label="Basic-field"
        helper="Helper"
      ></Input>
    </div>
  );
};
