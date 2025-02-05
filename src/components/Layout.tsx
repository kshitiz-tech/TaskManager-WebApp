import { Outlet } from "react-router-dom";
import NavBarUser from "./NavBarUser";

//layout of the the whole website
const Layout = () => {
  return (
    <div>
      <NavBarUser/>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
