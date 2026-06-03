import { Search } from "lucide-react";
function EmptyState({ query }) {
  return (
    <tr>
      <td colSpan={7} className="py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Search size={24} className="text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">
            {query ? `No results for "${query}"` : 'No users found'}
          </p>
          <p className="text-xs text-slate-400">Try adjusting your search term</p>
        </div>
      </td>
    </tr>
  );
}

export default EmptyState