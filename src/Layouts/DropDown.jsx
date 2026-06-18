import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function DropDown() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = localStorage.getItem("role") || "Admin";

  const emails = {
    Admin: "admin@gmail.com",
    Manager: "manager@gmail.com",
    Employee: "employee@gmail.com",
  };

  const initials = role.charAt(0).toUpperCase();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    setDropdownOpen(false);
    navigate("/login/admin");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={dropdownOpen}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 cursor-pointer select-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold">
          {initials}
        </div>

        <span className="text-sm font-medium text-slate-700 hidden sm:block">
          {role}
        </span>

        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          } hidden sm:block`}
        />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 transform origin-top-right transition-all">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-900">
              {role} User
            </p>
            <p className="text-xs text-slate-500 truncate" title={emails[role]}>
              {emails[role]}
            </p>
          </div>

          <Link
            to="/profile"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDown;