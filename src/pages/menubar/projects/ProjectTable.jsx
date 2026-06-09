import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProject } from "../../../redux/reducer/ProjectReducer";

function ProjectTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.projects);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3.5">Name</th>
              <th className="px-6 py-3.5">Short Code</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.length ? (
              projects.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">{p.shortcode}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{p.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => navigate(`/projects/edit/${p.id}`)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg cursor-pointer transition">
                        <Pencil size={12} /> Edit
                      </button>
                      <button onClick={() => dispatch(deleteProject(p.id))} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 rounded-lg cursor-pointer transition">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">
                  No Projects Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectTable;