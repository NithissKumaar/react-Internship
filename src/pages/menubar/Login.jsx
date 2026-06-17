import { Shield, Briefcase, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CName from "../../components/CName/CName";
const roles = [
  {
    title: "Admin",
    desc: "Manage portal settings & configurations",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "hover:border-blue-200",
    pill: "bg-blue-50 text-blue-600",
    route: "/login/admin",
  },
  {
    title: "Manager",
    desc: "Oversee teams, tasks & projects",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "hover:border-amber-200",
    pill: "bg-amber-50 text-amber-600",
    route: "/login/manager",
  },
  {
    title: "Employee",
    desc: "Access your daily workspace",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "hover:border-emerald-200",
    pill: "bg-emerald-50 text-emerald-600",
    route: "/login/employee",
  },
];
export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-slate-100/60 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Choose your role to sign in to your{" "}
            <CName className="font-semibold text-slate-700 text-sm" />{" "}
            account
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map(({ title, desc, icon: Icon, color, bg, border, pill, route }) => (
            <button
              key={title}
              onClick={() => navigate(route)}
              className={`
                group relative bg-white border border-slate-200 rounded-2xl p-5
                flex flex-col gap-4 text-left shadow-sm cursor-pointer
                transition-all duration-200
                 ${border} hover:-translate-y-0.5
              `}
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
                  <Icon size={20} className={color} />
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${pill}`}>
                  {title}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-sm text-slate-900">{title}</h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
              </div>
              <div className={`
                absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-200
                ${bg}
              `} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}