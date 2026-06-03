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

  

</div>
</>
    );
}

export default ToolBar