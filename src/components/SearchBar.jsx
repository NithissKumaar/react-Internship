import { Search } from "lucide-react";



function SearchBar({ search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

  {/* Title Section */}
  <div>
    <h2 className="text-2xl font-bold text-slate-800">
      Employee Details
    </h2>
  </div>

  {/* Search Bar */}
  <div className="relative w-full sm:w-80 left-145">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="text"
      placeholder="Search employees..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl shadow-sm
                 text-slate-700 placeholder:text-slate-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                 focus:border-blue-500 transition-all duration-200"
    />
  </div>

</div>
  );
}

export default SearchBar