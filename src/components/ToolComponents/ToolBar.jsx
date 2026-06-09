import SearchBar from "./SearchBar";

function ToolBar({ search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-6 border-b border-slate-100">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Employee Details</h2>
      </div>
      <SearchBar title="" search={search} setSearch={setSearch} />
    </div>
  );
}

export default ToolBar;