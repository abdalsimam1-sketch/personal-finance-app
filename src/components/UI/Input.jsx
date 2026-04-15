export const Input = ({
  placeholder,
  helper,
  name,
  label,
  variant,
  value,
  onChange,
  type = "text",
  error,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <label htmlFor={name} className="form-label fw-bold input-label m-0">
          {label}
        </label>
        <span className="text-preset-5 text-danger fw-bold">{error}</span>
      </div>
      <div className="input-wrapper">
        <span
          className={`text-muted prefix ${variant !== "prefix" ? "d-none" : ""}`}
        >
          $
        </span>
        <input
          type={variant === "prefix" ? "number" : type}
          placeholder={placeholder}
          id={name}
          className={`form-control ps-4 ${error && " border-danger"}`}
          value={value}
          onChange={onChange}
        />
        <i
          className={`bi bi-search icon text-muted ${variant !== "icon" ? "d-none" : ""}`}
        ></i>
      </div>
      <span className="align-self-end fw-bold text-end d-block helper-text text-preset-5 text-muted">
        {helper}
      </span>
    </div>
  );
};
