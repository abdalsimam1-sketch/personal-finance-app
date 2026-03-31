import { Link } from "react-router-dom";
export const SeeDetails = ({ label, SeeDetail, path }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="text-preset-2">{label}</h2>
      <Link to={path} className="text-decoration-none">
        <div className="d-flex gap-1 align-items-center">
          <span className="text-preset-5 text-muted">{SeeDetail}</span>
          <i className="bi bi-caret-right-fill text-dark"></i>
        </div>
      </Link>
    </div>
  );
};
