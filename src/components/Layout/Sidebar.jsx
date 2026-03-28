import smallLogo from "../../assets/images/logo-small.svg";
import largeLogo from "../../assets/images/logo-large.svg";
import close from "../../assets/images/icon-minimize-menu.svg";
import { sidebar } from "../../data/SideBarData";
import { Link } from "react-router-dom";
export const Sidebar = ({ menuIsOpen, toggleMenu }) => {
  return (
    <main>
      <section
        className={` bg-dark  rounded-end ${menuIsOpen ? "p-5" : "p-3"} d-flex flex-column justify-content-between `}
        style={{ height: "600px", width: menuIsOpen ? "300px" : "88px" }}
      >
        <div
          className={`d-flex flex-column gap-5 ${!menuIsOpen ? "align-items-center" : ""}`}
        >
          {menuIsOpen ? (
            <img src={largeLogo} alt="large-logo" className="mb-3" />
          ) : (
            <img src={smallLogo} alt="small-logo" style={{ width: "3rem" }} />
          )}
          <div className="nav-links d-flex flex-column gap-2">
            {sidebar.map((item, index) => (
              <div key={index}>
                <Link to={item.path}>
                  <div className="d-flex align-items-center gap-2 btn">
                    <img src={item.icon} alt="" />
                    {menuIsOpen && (
                      <span className="text-light">{item.name}</span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div
          className="d-flex gap-2 btn justify-content-center "
          onClick={toggleMenu}
        >
          <img src={close} alt="minimize menu" />
          {menuIsOpen && <span className="text-light">Minimize Menu</span>}
        </div>
      </section>
    </main>
  );
};
