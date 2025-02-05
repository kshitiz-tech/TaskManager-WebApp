import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { USERNAME } from "../constant";
import { useState, useEffect } from "react";

//layout of the the whole website
const Layout_User = () => {
  const [Name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem(USERNAME);
    setName(storedName);
  }, []);


  return (
    <div>
      <Navbar name={Name} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout_User;
