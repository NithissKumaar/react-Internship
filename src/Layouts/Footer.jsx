import { Copyright } from "lucide-react";
function Footer() {
  return (
    <footer className="w-full bg-white py-1 border-t border-slate-300 shadow-sm">

      <div className=" px-6 h-5 flex items-center justify-between  bg-white ">
        <div className="mt-auto flex items-center justify-center gap-2">
            <Copyright size={12}/>
        <p className="text-sm text-slate-500">
           2026 Making Minds
        </p>

        </div>
        

        <div className="flex gap-5 text-sm text-slate-500">


        </div>

      </div>

    </footer>
  );
}

export default Footer;