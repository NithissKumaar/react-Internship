import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Navbar sidebarOpen={sidebarOpen}
      onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      
        <Footer />

      
      

    </div>
      
    </>
  );
}

export default Layout;