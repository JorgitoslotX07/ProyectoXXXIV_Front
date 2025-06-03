import { Outlet } from "react-router-dom";
import type { FC } from "react";
import { SidebarAdminComponent } from "../../../components/__Admin/SidebarAdminComponent/SidebarAdminComponent";

export const PanelAdminPage: FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <SidebarAdminComponent />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}