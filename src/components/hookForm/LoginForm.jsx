import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

function LoginForm({ role = "admin" }) {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const credentials = {
    admin: { email: "admin@gmail.com", password: "1234" },
    manager: { email: "manager@gmail.com", password: "1234" },
    employee: { email: "employee@gmail.com", password: "1234" }
  };

  const current = credentials[role?.toLowerCase()] || credentials.admin;

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (data.email === current.email && data.password === current.password) {
      localStorage.setItem("role", role.charAt(0).toUpperCase() + role.slice(1));
     toast.success("Login successful!");
      navigate("/dashboard", { state: { sidebarOpen: true } });
      return;
    }

    setError(`Invalid email or password`);
    setLoading(false);
  };

  return (
    <>
      <div>
        {error && (
          <div className="flex items-start gap-2.5 px-4 py-3 mb-5 bg-red-50 border border-red-100 rounded-xl">
            <AlertCircle size={16} className="text-red-500 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email </label>
            <input
              type="email"
              placeholder={current.email}
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 4, message: "Minimum 4 characters" }
                })}
                className="w-full px-4 py-2.5 pr-11 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
              >
                {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing in..." : <><LogIn size={16} />Sign In</>}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-slate-600 mt-5">
        Demo: {current.email} / 1234
      </p>
    </>
  );
}

export default LoginForm;