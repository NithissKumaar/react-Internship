import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, X } from "lucide-react";

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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50
        transition-transform duration-300
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

        <nav className="p-3">
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
      </aside>
    </>
  );
}

export default Sidebar;