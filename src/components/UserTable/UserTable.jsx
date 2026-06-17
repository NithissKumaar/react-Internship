import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../redux/reducer/UserReducer";
import EmptyState from "./EmptySearch";
import SkeletonRow from "../ToolComponents/SkeletonRow";
import ToolBar from "../ToolComponents/ToolBar";
import DeleteConfirmModal from "../ToolComponents/DeleteConfirmModal";

function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const perPage = 5;

  const filtered = users.filter((u) =>
    [u.name, u.email, u.username].some((f) =>
      String(f || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <ToolBar search={search} setSearch={setSearch} />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["#", "Name", "Username", "Email", "Phone", "Website", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            ) : current.length === 0 ? (
              <EmptyState query={search} />
            ) : (
              current.map((user, idx) => (
                <tr key={user.id} className={`group transition-colors duration-150 hover:bg-blue-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                      {(page - 1) * perPage + idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                        {user.name?.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">@{user.username}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.phone}</td>
                  <td className="px-6 py-4">
                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600">{user.website}</a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                        <Eye size={12} /> View
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <Pencil size={12} /> Edit
                      </button>
                      <button onClick={() => setDeleteTargetId(user.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && (
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Showing <span className="font-medium text-slate-600">{current.length}</span> of <span className="font-medium text-slate-600">{filtered.length}</span> users
          </p>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${page === i + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete User"
        message="Are you sure you want to permanently delete this account? The user will lose access immediately."
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => dispatch(deleteUser(deleteTargetId))}
      />
    </div>
  );
}

export default UserTable;