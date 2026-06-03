import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, X } from "lucide-react";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
];

function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <aside
  className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64
  bg-white shadow-xl z-40
  transition-transform duration-300
  flex flex-col
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
       
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>

          <button
            onClick={onClose}
            className="cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dashboard are listed with map given */}
        <nav className="p-3 flex-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 ${
                pathname === to
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        
        <div className="p-3  ">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-center"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;