import { Outlet } from "react-router-dom";
import SideBarAdmin from "./components/SideBarAdmin";
import NavBarAdmin from "./components/NavBarAdmin";
import { useState } from "react";

function AdminLayout() {
  const [Collapse, setCollapse] = useState<boolean>(true);

  return (
    <div className="antialiased bg-gray-200 min-h-screen text-slate-300 relative">
      <div className="w-full flex flex-row">
        <div className="overflow-hidden mr-2">
          <SideBarAdmin collapse={Collapse} />
        </div>
        {/* Content */}
        <main className="w-full bg-gray-200 ml-2">
          <NavBarAdmin collapse={Collapse} setCollapse={setCollapse} />
          <div className="mt-5 mr-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
