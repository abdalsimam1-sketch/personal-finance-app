export const Input = ({ placeholder, helper, name, label }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label fw-bold input-label">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        id={name}
        className="form-control"
      />
      <span className="align-self-end fw-bold text-end d-block helper-text">
        {helper}
      </span>
    </div>
  );
};
