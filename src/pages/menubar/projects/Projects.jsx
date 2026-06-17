import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Plus, FolderKanban, Calendar, Eye, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteProject, setSelected, editProject } from "../../../redux/reducer/ProjectReducer";
import { fetchProjects } from "../../../redux/thunks/ProjectThunk";
import SearchBar from "../../../components/ToolComponents/SearchBar";
import ProjectPopup from "./ProjectPopup";
import DeleteConfirmModal from "../../../components/ToolComponents/DeleteConfirmModal";

export default function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.project.projects);
  const selected = useSelector((s) => s.project.selected);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const updateStatus = (project, status) => {
    dispatch(editProject({ ...project, status }));
    toast.success(`Status updated to "${status}" successfully!`);
  };

  const filtered = projects.filter((p) =>
    [p.name, p.shortcode, p.date].some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const cards = [
    ["No Of Projects", projects.length, FolderKanban],
    ["Last Project Date", projects.at(-1)?.date || "-", Calendar],
  ];

  return (
    <div className="p-3 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Projects</h1>
          <p className="text-xs text-slate-500">Manage Projects</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar title="" search={search} setSearch={setSearch} />
          <button
            onClick={() => navigate("/projects/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm flex items-center gap-1 cursor-pointer transition"
          >
            <Plus size={15} />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {cards.map(([t, v, Icon]) => (
          <div key={t} className="bg-white border border-slate-200 rounded-md p-3 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-xs text-slate-500">{t}</p>
              <h2 className="text-blue-600 font-semibold text-xl mt-0.5">{v}</h2>
            </div>
            <Icon className="text-blue-600" size={20} />
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-50 text-slate-700 font-medium">
              <tr>
                {["S.NO", "Project", "Code", "Date", "Status", "Action"].map((x) => (
                  <th key={x} className="p-2.5">{x}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.length ? (
                filtered.map((p, i) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-2.5">{i + 1}</td>
                    <td className="p-2.5 font-medium">{p.name}</td>
                    <td className="p-2.5">{p.shortcode}</td>
                    <td className="p-2.5">{p.date}</td>
                    <td className="p-2.5">
                      <select
                        value={p.status || "Not Started"}
                        onChange={(e) => updateStatus(p, e.target.value)}
                        className="border border-slate-200 rounded-md px-2 py-1 text-xs bg-white cursor-pointer outline-none focus:border-blue-500"
                      >
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </td>
                    <td className="p-2.5">
                      <div className="flex gap-4 items-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => dispatch(setSelected(selected?.id === p.id ? null : p))}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          onClick={() => navigate(`/projects/edit/${p.id}`)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 cursor-pointer transition"
                          onClick={() => setDeleteTargetId(p.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-slate-400">No Projects</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <ProjectPopup
          project={selected}
          onClose={() => dispatch(setSelected(null))}
        />
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Project"
        message="Are you sure you want to permanently delete this project? This action cannot be undone."
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          dispatch(deleteProject(deleteTargetId));
          toast.success("Project deleted successfully!");
        }}
      />
    </div>
  );
}