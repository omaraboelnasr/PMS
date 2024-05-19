import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <NavBar />
      <div className="w-100 d-flex justify-content-between">
        <div style={{ width: '15%' }}>
          <SideBar />
        </div>
        <div  style={{width:'85%' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
