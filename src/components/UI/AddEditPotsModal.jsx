import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { themes } from "../../data/Themes";
import { useState } from "react";
export const AddEditPotsModal = ({ mode, maximumCharacters, onClose }) => {
  const [themesOpen, setThemesOpen] = useState(false);
  const toggleThemes = () => {
    setThemesOpen(!themesOpen);
  };
  const initialState = {
    potName: "",
    target: "",
    theme: themes[0],
  };
  const [potsFormState, setPotsFormState] = useState(initialState);

  return (
    <div
      className="position-fixed start-0 top-0 d-flex justify-content-center align-items-center w-100 h-100"
      style={{ height: "100vh", background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <main
        className="card p-4  "
        style={{
          maxWidth: "500px",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-preset-1">
            {mode === "add" ? "Add New" : "Edit"} Pot
          </h1>
          <i className="bi bi-x-circle fs-2 btn" onClick={onClose}></i>
        </div>
        <div>
          <p className="text-preset-4 text-muted">
            {mode === "add"
              ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases"
              : "If your saving targets chnage, feel free to update your pots"}
          </p>
        </div>
        <section className="mb-3">
          <div className="d-flex flex-column ">
            <Input
              placeholder="e.g. Rainy Days"
              label="  Pot Name"
              value={potsFormState.potName}
              onChange={(e) =>
                setPotsFormState((current) => ({
                  ...current,
                  potName: e.target.value,
                }))
              }
            ></Input>
            <span className="text-preset-5 text-muted align-self-end">
              {maximumCharacters} characters left
            </span>
          </div>

          <div>
            <Input
              placeholder="e.g. 2000"
              variant="prefix"
              label="Target"
              value={potsFormState.target}
              onChange={(e) =>
                setPotsFormState((current) => ({
                  ...current,
                  target: e.target.value,
                }))
              }
            ></Input>
          </div>
          <div></div>
        </section>
        <section
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={toggleThemes}
        >
          <div className="form-control d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2 align-items-center">
              <span
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: potsFormState.theme.theme,
                }}
              ></span>
              <span>{potsFormState.theme.name}</span>
            </div>
            <i className="bi bi-caret-down-fill"></i>
          </div>
          {themesOpen && (
            <div className="p-3 rounded d-flex flex-column position-absolute bg-light start-0 end-0">
              {themes.map((item) => (
                <div
                  key={item.name}
                  className="btn "
                  onClick={() =>
                    setPotsFormState((current) => ({
                      ...current,
                      theme: item,
                    }))
                  }
                >
                  <div className="d-flex gap-2 align-items-center">
                    <span
                      style={{
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "50%",
                        backgroundColor: item.theme,
                      }}
                    ></span>
                    <span>{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <Button
          variant="primary"
          children={mode === "add" ? "Add Pot" : "Save Changes"}
        ></Button>
      </main>
    </div>
  );
};
