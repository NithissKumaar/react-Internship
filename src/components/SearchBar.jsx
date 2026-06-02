import { Search } from "lucide-react";



function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full sm:w-72">

      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
      />

    </div>
  );
}

export default SearchBar;