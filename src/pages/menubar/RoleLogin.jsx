import { useNavigate, useParams } from "react-router-dom";
import { House } from "lucide-react";
import { useEffect, useState } from "react";
import LoginForm from "../../components/hookForm/LoginForm";
import CName from "../../components/CName/CName";

function RoleLogin() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(role || "admin");

  useEffect(() => {
    setSelectedRole(role || "admin");
  }, [role]);

  const handleRole = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    navigate(`/login/${value}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>

          <p className="text-sm text-slate-500 mt-1.5">
            Sign in to your{" "}
            <CName className="text-[14px]" /> account
          </p>
        </div>

        {/* Old UI Style Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Role
          </label>

          <select
            value={selectedRole}
            onChange={handleRole}
            className="
              w-full h-11 px-4 rounded-xl
              border border-slate-200
              bg-white text-slate-700 text-sm
              focus:outline-none
              focus:border-blue-500
              transition
              cursor-pointer
            "
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <LoginForm role={selectedRole} />
      </div>
    </div>
  );
}

export default RoleLogin;