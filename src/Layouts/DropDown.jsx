import { useState } from 'react';
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function DropDown(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return(
        <>
        
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
              >
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                  AD
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Admin User</p>
                    <p className="text-xs text-slate-500 truncate">admin@gmail.com</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
            </>
    );
}

export default DropDown