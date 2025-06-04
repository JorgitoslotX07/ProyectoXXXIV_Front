import { Outlet } from "react-router-dom";
import type { FC } from "react";
import { SidebarAdminComponent } from "../../../components/__Admin/SidebarAdminComponent/SidebarAdminComponent";
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";


export const PanelAdminPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        modoClaro ? "bg-[#F4F4F4] text-[#222]" : "bg-gray-900 text-white"
      }`}
    >
      <SidebarAdminComponent/>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
