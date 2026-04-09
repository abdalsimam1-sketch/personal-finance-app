import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "../UI/Button";
import { themes } from "../../data/Themes";
export const AddEditBudgetModal = ({
  theme,
  onClose,
  mode,
  category,
  maximum,
  usedThemes,
}) => {
  const categories = [
    {
      name: "Entertainment",
    },
    {
      name: "Bills",
    },
    {
      name: "Groceries",
    },
    {
      name: "Dining Out",
    },
    {
      name: "Transaportaion",
    },
    {
      name: "Persoanl Care",
    },
    {
      name: "Education",
    },
  ];
  const [themesOpen, setThemesOpen] = useState(false);
  const toggleTheme = () => {
    setThemesOpen(!themesOpen);
  };
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const initialFormState = {
    category: category ?? "Entertainment",
    maximum: maximum ?? "",
    theme: theme ?? themes[0],
  };

  const [formState, setFormState] = useState(initialFormState);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="card p-4 position-relative"
        style={{
          maxWidth: "550px",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <section className="d-flex justify-content-between align-items-center">
          <h1 className="text-preset-1">
            {mode === "add" ? "Add New" : "Edit"} Budget
          </h1>
          <i className="bi bi-x-circle fs-3 btn" onClick={onClose}></i>
        </section>
        <section>
          <p className="text-preset-4 text-muted">
            {mode === "add"
              ? " Choose a category to set a spending budget. These categories can help monitor spending"
              : "As your budgets chnage, fell free to update your spending limits"}
          </p>
        </section>
        <section className="input-section mb-3">
          <div
            className="position-relative"
            onClick={() => {
              toggleCategories();
              setThemesOpen(false);
            }}
          >
            <label>Budget Category</label>
            <div
              className="form-control d-flex justify-content-between"
              style={{ cursor: "pointer" }}
            >
              <span className="text-preset-4 text-muted">
                {formState.category}
              </span>
              <i className="bi bi-caret-down-fill"></i>
            </div>

            {categoriesOpen && (
              <div
                className="position-absolute start-0 end-0 p-3 bg-light d-flex flex-column rounded"
                style={{ zIndex: "1000" }}
              >
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className="btn text-start"
                    onClick={() =>
                      setFormState((current) => ({
                        ...current,
                        category: item.name,
                      }))
                    }
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="d-flex flex-column">
            <Input
              label="Maximum Spend"
              variant="prefix"
              placeholder="e.g 2000"
              value={formState.maximum}
              onChange={(e) =>
                setFormState((current) => ({
                  ...current,
                  maximum: e.target.value,
                }))
              }
            ></Input>
          </div>
          <div
            className="position-relative"
            onClick={() => {
              toggleTheme();
              setCategoriesOpen(false);
            }}
          >
            <label>Theme</label>
            <div
              className="form-control d-flex justify-content-between "
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex gap-2">
                <span
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    backgroundColor: formState.theme.theme,
                  }}
                ></span>
                <span>{formState.theme.name}</span>
              </div>
              <i className="bi bi-caret-down-fill"></i>
            </div>
            {themesOpen && (
              <div className="position-absolute d-flex flex-column bg-light start-0 end-0  p-3 rounded">
                {themes.map((item) => {
                  const isUsed = usedThemes?.includes(item.theme);
                  return (
                    <div
                      key={item.name}
                      className="btn  bg-light"
                      onClick={() =>
                        setFormState((current) => ({
                          ...current,
                          theme: item,
                        }))
                      }
                    >
                      <div className="d-flex justify-content-between ">
                        <div className="d-flex gap-1 align-items-center">
                          <span
                            style={{
                              width: "1rem",
                              height: "1rem",
                              backgroundColor: item.theme,
                              borderRadius: "50%",
                            }}
                          ></span>
                          <span>{item.name}</span>
                        </div>
                        {isUsed && <span>Already Used</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        <Button
          variant="primary"
          children={mode === "add" ? "Add New Budget" : "Save Changes"}
        ></Button>
      </div>
    </div>
  );
};
