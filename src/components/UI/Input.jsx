export const Input = ({
  placeholder,
  helper,
  name,
  label,
  variant,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label fw-bold input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <span
          className={`text-muted prefix ${variant !== "prefix" ? "d-none" : ""}`}
        >
          $
        </span>
        <input
          type="text"
          placeholder={placeholder}
          id={name}
          className="form-control ps-4"
          value={value}
          onChange={onChange}
        />
        <i
          className={`bi bi-search icon text-muted ${variant !== "icon" ? "d-none" : ""}`}
        ></i>
      </div>
      <span className="align-self-end fw-bold text-end d-block helper-text">
        {helper}
      </span>
    </div>
  );
};
