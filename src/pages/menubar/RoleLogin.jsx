import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../../components/hookForm/LoginForm";
import CName from "../../components/CName/CName";

function RoleLogin() {
  const { role } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="text-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Sign in to your{" "}
            <CName className="text-[14px]" />{" "}
            account
          </p>
        </div>
        <LoginForm role={role} />
      </div>
    </div>
  );
}

export default RoleLogin;