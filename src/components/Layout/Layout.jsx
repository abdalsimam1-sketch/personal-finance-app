import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <main className="d-flex gap-5">
      <section>
        <div className="d-none d-lg-flex">
          <Sidebar menuIsOpen={menuIsOpen} toggleMenu={toggleMenu}></Sidebar>
        </div>
        <div className="d-lg-none">
          <MobileNav></MobileNav>
        </div>
      </section>

      <section className="text-dark">
        <Outlet></Outlet>
      </section>
    </main>
  );
};
