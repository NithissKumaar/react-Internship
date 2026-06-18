import { Menu ,X} from "lucide-react";
import DropDown from "./DropDown";
import logo from "../assets/WhatsApp Image 2026-06-03 at 12.58.30.jpeg";
import { Link } from "react-router-dom";
import CName from "../components/CName/CName";

function Navbar({ onMenuClick, sidebarOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2">
          
          

          <button
            onClick={onMenuClick}
            className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <Menu size={20} />
          </button>
            

          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 overflow-hidden">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <CName className="text-xl" />
          </Link>
        </div>

        <DropDown />
      </div>
    </header>
  );
}

export default Navbar;
