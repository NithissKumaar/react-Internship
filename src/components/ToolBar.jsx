import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import SearchBar from "./SearchBar";

function ToolBar({search,setSearch}){
    const [filterOpen, setFilterOpen] = useState(false);
    return(
        <>
        {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">

  <SearchBar search={search} setSearch={setSearch} />

  <button
    onClick={() => setFilterOpen((prev) => !prev)}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${
      filterOpen
        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
    }`}
  >
    <SlidersHorizontal size={15} />
    Filters
  </button>

</div>
</>
    );
}

export default ToolBar;