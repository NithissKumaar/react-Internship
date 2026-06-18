import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, X, Contact, Folder, FileBarChart, Receipt, ClipboardList, MessageSquareReply } from "lucide-react";

const roleMenus = {
  admin: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/users", label: "Users", icon: Users },
    { to: "/employee", label: "Employee", icon: Contact },
    { to: "/projects", label: "Projects", icon: Folder },
    { to: "/reports", label: "Reports", icon: FileBarChart },
    { to: "/forms", label: "Forms", icon: ClipboardList },
    { to: "/responses", label: "Responses", icon: MessageSquareReply },
    { to: "/invoices", label: "Invoices", icon: Receipt },
  ],
  manager: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/projects", label: "Projects", icon: Folder },
    { to: "/invoices", label: "Invoices", icon: Receipt },
  ],
  employee: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profile", label: "Profile", icon: Contact },
    { to: "/forms", label: "Forms", icon: ClipboardList },
    { to: "/invoices", label: "Invoices", icon: Receipt },
  ],
};

function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");
  const navLinks = roleMenus[role] || [];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white shadow-xl z-40 transition-transform duration-300 flex flex-col overflow-hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      
        <nav className="flex-1 overflow-y-auto p-3 scrollbar-hide" style={{ scrollBehavior: "auto" }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 ${pathname === to ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"}`}>
              {Icon && <Icon size={18} />}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3">
          <Link to="/login/admin" onClick={() => { localStorage.removeItem("role"); navigate("/login/admin"); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50">
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;