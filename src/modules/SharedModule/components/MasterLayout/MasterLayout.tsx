import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <NavBar  />
      <div className="d-flex">
        <div className="me-2">
          <SideBar />
        </div>
        <div className="w-75">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
