import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editProject } from "../../../redux/reducer/ProjectReducer";
import { showSuccess } from "../../../utils/toast";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const project = useSelector((state) =>
    state.project.projects.find((p) => p.id === Number(id))
  );

  const [form, setForm] = useState(
    project || { id: "", name: "", shortcode: "", date: "", description: "", status: "Not Started" }
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">
        Project not found
      </div>
    );
  }

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const update = (e) => {
    e.preventDefault();
    dispatch(editProject(form));
    navigate("/projects");
    showSuccess("Project Updated Successfully");
  };

  const input = "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white";

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
          <p className="text-sm text-slate-500">Manage Project Information</p>
        </div>

        <form onSubmit={update} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Project Name</label>
            <input name="name" value={form.name} onChange={change} placeholder="Project Name" className={input} required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Short Code</label>
            <input name="shortcode" value={form.shortcode} onChange={change} placeholder="Short Code" className={input} required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Date</label>
            <input type="date" name="date" value={form.date} onChange={change} className={input} required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Description</label>
            <textarea name="description" value={form.description} onChange={change} placeholder="Project Description" rows={4} className={`${input} resize-none`} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => navigate("/projects")} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium cursor-pointer transition">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium cursor-pointer transition">
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}