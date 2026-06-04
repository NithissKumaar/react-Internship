import { Copyright } from "lucide-react";
function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200">

      <div className="max-w-7xl mx-auto px-6 h-7 flex items-center justify-between  bg-slate-100">
        <div className="flex items-center justify-center gap-2">
            <Copyright size={12}/>
        <p className="text-sm text-slate-500">
           2026 Admin Dashboard
        </p>

        </div>
        

        <div className="flex gap-5 text-sm text-slate-500">

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Privacy
          </a>

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Terms
          </a>

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Support
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;