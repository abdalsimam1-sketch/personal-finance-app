import { Outlet } from "react-router-dom";
import bigLogo from "../assets/logo-large.svg";
import smallLogo from "../assets/logo-small.svg";
import overview from "../assets/icon-nav-overview.svg";
import transactions from "../assets/icon-nav-transactions.svg";
import pots from "../assets/icon-nav-pots.svg";
import budgets from "../assets/icon-nav-budgets.svg";
import recurring from "../assets/icon-nav-recurring-bills.svg";
import { useState } from "react";
import close from "../assets/icon-minimize-menu.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logout from "../assets/logout1.png";

export const SharedLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setSideBarOpen((current) => (current === true ? false : true));
  };

  const navlinks = [
    {
      name: "Overview",
      icon: overview,
      link: "/overview",
    },
    {
      name: "Transactions",
      icon: transactions,
      link: "/transactions",
    },
    {
      name: "Pots",
      icon: pots,
      link: "",
    },
    {
      name: "Budgets",
      icon: budgets,
      link: "",
    },
    {
      name: "Recurring Bills",
      icon: recurring,
      link: "",
    },
  ];

  const { pathname } = useLocation();

  const activeLink = (path: string) => {
    return pathname === path || false;
  };

  return (
    <div className="flex flex-col">
      <div
        className={`desktop-sidebar hidden lg:flex flex-col justify-between bg-grey-900 ${sideBarOpen ? "w-70" : "w-20"} h-screen rounded-r py-5 mr-10`}
      >
        <div className={`flex flex-col gap-10 items-center`}>
          <img
            src={sideBarOpen ? bigLogo : smallLogo}
            alt="big logo"
            className={`${sideBarOpen ? "w-[10rem]" : "h-[2rem]"} self-center`}
          />
          <section
            className={`nav-links flex flex-col gap-5  ${sideBarOpen ? "w-[11rem]" : "h-[2rem]"} text-nowrap`}
          >
            {navlinks.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-start gap-5 bg-white rounded cursor-pointer ${sideBarOpen ? "pl-5 p-2" : "p-1"} border-l-5  ${activeLink(item.link) ? " border-green  text-green-800" : "border-white"}  `}
              >
                <img
                  src={item.icon}
                  alt={(item.name, "image")}
                  className={`${!sideBarOpen ? "w-[1rem]" : ""}`}
                />
                {sideBarOpen && <p className="">{item.name}</p>}
              </Link>
            ))}
          </section>
        </div>
        <div className="flex flex-col gap-3">
          <section
            className="close-logout flex justify-center gap-2 cursor-pointer"
            onClick={() => {
              toggleSideBar();
            }}
          >
            <img src={close} alt="miniminze menu" className="" />
            {sideBarOpen && <p className="text-white">Minimize Menu</p>}
          </section>

          <button
            className={`bg-white border-red border-2 text-red rounded p-2  ${sideBarOpen ? "w-[11rem]" : "h-[2rem]"} self-center cursor-pointer flex items-center gap-3 pl-3`}
          >
            <img
              src={logout}
              alt=""
              className="w-[1.5rem] border-0 outline-0"
            />
            {sideBarOpen && <p>Logout</p>}
          </button>
        </div>
      </div>

      <div className="mobile-navbar lg:hidden bg-grey-900 p-5 fixed inset-x-0 bottom-0  rounded-t-xl flex gap-3 justify-around items-center">
        {navlinks.map((item) => (
          <Link
            to={item.link}
            className={`flex flex-col flex-1 bg-white rounded p-1 border-3 ${activeLink(item.link) ? "bg-white text-green  border-green" : "text-black border-white"}`}
          >
            <img
              src={item.icon}
              alt={(item.name, "image")}
              className="self-center"
            />
            <p className="text-nowrap hidden md:inline-block lg:hidden text-captions text-center">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
