import { useState } from "react";
import { Sidebar } from "./Sidebar";
export const Layout = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div>
      <section>
        <Sidebar menuIsOpen={menuIsOpen} toggleMenu={toggleMenu}></Sidebar>
      </section>
      <section></section>
    </div>
  );
};
