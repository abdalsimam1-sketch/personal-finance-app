export const Button = ({ children, variant, onClick }) => {
  return (
    <button className={` btn btn-${variant} `} onClick={onClick}>
      {children}
      {variant === "tertiary" && (
        <i className="bi bi-caret-right-fill ms-2"></i>
      )}
    </button>
  );
};
