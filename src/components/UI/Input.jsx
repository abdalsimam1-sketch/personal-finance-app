export const Input = ({ placeholder, helper, name, label, variant }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label fw-bold input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <span className="prefix text-muted">$</span>
        <input
          type="text"
          placeholder={placeholder}
          id={name}
          className="form-control ps-4"
        />
      </div>
      <span className="align-self-end fw-bold text-end d-block helper-text">
        {helper}
      </span>
    </div>
  );
};
