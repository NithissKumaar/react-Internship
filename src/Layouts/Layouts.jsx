import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.state?.sidebarOpen) {
      setSidebarOpen(true);
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(prev => !prev)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 p-6 scrollbar-hide" style={{ scrollBehavior: "auto" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;