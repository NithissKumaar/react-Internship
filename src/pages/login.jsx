import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useState } from 'react';

function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate async auth delay
    await new Promise(r => setTimeout(r, 600));

    if (email === 'admin@gmail.com' && password === '1234') {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try admin@gmail.com / 1234');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">

      {/* ── Card ── */}
      <div className="w-full max-w-md">

        {/* Logo + Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1.5">Sign in to your NithissApp account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 mb-5 bg-red-50 border border-red-100 rounded-xl">
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800
                           placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                           focus:border-blue-400 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 pr-11 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800
                             placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                             focus:border-blue-400 focus:bg-white transition-all duration-200"
                />
                {/* Show / Hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border border-slate-300 bg-white peer-checked:bg-blue-600
                                peer-checked:border-blue-600 transition-all duration-150 flex items-center justify-center">
                  {remember && (
                    <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="1 4 3.5 6.5 9 1" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-slate-600">Remember me for 30 days</span>
            </label>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white
                         bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-200
                         disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>

          </form>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Demo credentials: <span className="font-medium text-slate-600">admin@gmail.com</span> / <span className="font-medium text-slate-600">1234</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
