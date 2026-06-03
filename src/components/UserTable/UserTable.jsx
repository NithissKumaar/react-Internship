import { useState, useEffect } from 'react';
import { Eye, Pencil, Search, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../ToolComponents/SearchBar';
import EmptyState from './EmptySearch';
import SkeletonRow from '../ToolComponents/SkeletonRow';
import ToolBar from '../ToolComponents/ToolBar';

function UserTable() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter users by search query (name, email, username)
  const filtered = users.filter(u =>
    [u.name, u.email, u.username].some(f =>
      f.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <ToolBar search={search} setSearch={setSearch} />

    {/* ── Responsive Scroll Wrapper ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* Table Head */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['#', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {loading? [...Array(6)].map((_, i) => <SkeletonRow key={i} />): filtered.length === 0
                ? <EmptyState query={search} />
                : filtered.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={`group transition-colors duration-150 hover:bg-blue-50/40 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                      }`}
                    >
                      {/* ID badge */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                          {user.id}
                        </span>
                      </td>

                      {/* Name + avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800 whitespace-nowrap">{user.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">@{user.username}</td>

                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-600 hover:underline whitespace-nowrap"
                        >
                          {user.email}
                        </a>
                      </td>

                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{user.phone}</td>

                      <td className="px-6 py-4">
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-blue-600 transition-colors whitespace-nowrap"
                        >
                          {user.website}
                        </a>
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                        <button
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600
                                bg-blue-100 rounded-lg border border-blue-100 transition-colors duration-150 cursor-pointer"
                        >
                        <Eye size={12} /> View
                        </button>

                        <button
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600
                                bg-slate-200 rounded-lg border border-slate-200 transition-colors duration-150 cursor-pointer"
    >
                        <Pencil size={12} /> Edit
                        </button>
                      </div>
                    </td>
                    </tr>
                  ))
            }
          </tbody>
        </table>
      </div>

      {/* ── Footer row count ── */}
      {!loading && (
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing <span className="font-medium text-slate-600">{filtered.length}</span> of{' '}
            <span className="font-medium text-slate-600">{users.length}</span> users
          </p>
          <div className="flex items-center gap-1">
            {[1].map(p => (
              <button key={p} className="w-7 h-7 rounded-lg text-xs font-medium bg-blue-600 text-white shadow-sm">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable
