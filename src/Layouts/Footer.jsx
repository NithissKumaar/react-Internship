import { Copyright } from "lucide-react";
function Footer() {
  return (
    <footer className="w-full bg-white  border-slate-200 py-1">

      <div className=" px-6 h-7 flex items-center justify-between  bg-slate-100">
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