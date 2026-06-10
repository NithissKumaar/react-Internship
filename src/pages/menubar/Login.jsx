import { Shield, Briefcase, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CName from "../../components/CName/CName";

function Login() {
  const navigate = useNavigate();

  const roles = [
    { title: "Admin", icon: Shield, color: "text-blue-600", bg: "bg-blue-50", route: "/login/admin" },
    { title: "Manager", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50", route: "/login/manager" },
    { title: "Employee", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", route: "/login/employee" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-6 pt-24">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to your{" "}<CName className="text-[14px]" />{" "}account
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {roles.map(({ title, icon: Icon, color, bg, route }) => (
            <button
              key={title}
              onClick={() => navigate(route)}
              className="group w-full md:w-[260px] bg-white border border-slate-200 rounded-xl px-6 py-5 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
                  <Icon size={22} className={color} />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold text-slate-900">{title}</h2>
                  <p className="text-xs text-slate-500">Continue</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-slate-200">
                <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;