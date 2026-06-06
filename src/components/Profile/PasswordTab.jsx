function PasswordTab() {
  return (
    <div className="mt-8">

      <h2 className="text-3xl font-bold">
        Password
      </h2>

      <div className="space-y-4 mt-8">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full h-12 px-4 border border-slate-400 bg-slate-50 text-sm w-full outline-none transition-all duration-200 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 rounded-xl "
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full h-12 px-4 border border-slate-400 bg-slate-50 text-sm w-full outline-none transition-all duration-200 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 rounded-xl "
        />

        <button className="bg-blue-600 text-white px-8 h-12 rounded-xl cursor-pointer">
          Update Password
        </button>

      </div>

    </div>
  );
}

export default PasswordTab;