import smallLogo from "../../assets/images/logo-small.svg";
import largeLogo from "../../assets/images/logo-large.svg";
import close from "../../assets/images/icon-minimize-menu.svg";
import { sidebar } from "../../data/SideBarData";
import { Link } from "react-router-dom";
export const Sidebar = () => {
  return (
    <main>
      <section
        className=" bg-dark container rounded-end p-5 d-flex flex-column justify-content-between "
        style={{ height: "600px", width: "300px" }}
      >
        <div>
          <img src={largeLogo} alt="" className="mb-3" />
          <div className="nav-links d-flex flex-column gap-2">
            {sidebar.map((item, index) => (
              <div className="col-12 " key={index}>
                <Link to={item.path}>
                  <div className="d-flex align-items-center gap-2 btn">
                    <img src={item.icon} alt="" />
                    <span className="text-light">{item.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex gap-2 btn">
          <img src={close} alt="" />
          <span className="text-light">Minimize Menu</span>
        </div>
      </section>
    </main>
  );
};
