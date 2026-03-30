import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
export const Layout = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <main className="">
      <section>
        <div className="d-none d-lg-flex">
          <Sidebar menuIsOpen={menuIsOpen} toggleMenu={toggleMenu}></Sidebar>
        </div>
        <div className="d-lg-none">
          <MobileNav></MobileNav>
        </div>
      </section>
      <section></section>
    </main>
  );
};
