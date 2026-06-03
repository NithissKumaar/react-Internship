import LoginForm from "../components/LoginForm";

import { Link } from "react-router-dom";
import LogoTitle from "../components/CName/CName";
import CName from "../components/CName/CName";



function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">

      <div className="w-full max-w-md ">
        

        <div className="text-center mb-8">
          
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            
            Welcome back
          </h1>

          <p className="text-sm text-slate-500 mt-1.5">
            Sign in to your <CName className="text-[14px]"></CName> account
          </p>
        </div>

        <LoginForm />

      </div>
    </div>
  );
}

export default Login;
