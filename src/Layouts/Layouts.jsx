import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen}
      onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;