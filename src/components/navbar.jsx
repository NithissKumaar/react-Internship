import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DropDown from './DropDown';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users',     label: 'Users',     icon: Users },
];

function Navbar() {
  const { pathname } = useLocation();
  

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors duration-200">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-slate-900 font-semibold text-base tracking-tight hidden sm:block">
              Nithiss<span className="text-blue-600">App</span>
            </span>
          </Link>

          {/* ── Navigation Links ── */}
          <nav className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Bell + Avatar ── */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors duration-200">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>
            
            {/*profile dropdown*/}
            <DropDown></DropDown>

            
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
