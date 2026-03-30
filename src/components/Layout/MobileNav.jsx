import React from "react";
import { sidebar } from "../../data/SideBarData";
import { Link } from "react-router-dom";

export const MobileNav = () => {
  return (
    <div className="bg-dark d-flex justify-content-around rounded-top py-2">
      {sidebar.map((item, index) => (
        <Link to={item.path} className="text-decoration-none" key={index}>
          <div className="btn d-flex flex-column align-items-center justify-content-around">
            <img
              src={item.icon}
              alt={item.name + " image"}
              style={{ height: "20px" }}
              className="img-fluid"
            />
            <span className="text-decoration-none text-light text-nowrap d-none d-md-block d-lg-none">
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
