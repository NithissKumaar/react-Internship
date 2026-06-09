import { Search } from "lucide-react";

function SearchBar({ title = "", search = "", setSearch }) {
  return (
    <div className="flex flex-col gap-2">
      {title && <h2 className="text-2xl font-bold text-slate-800">{title}</h2>}

      <div className="relative w-full sm:w-80 sm:ml-[570px]">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl shadow-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default SearchBar;