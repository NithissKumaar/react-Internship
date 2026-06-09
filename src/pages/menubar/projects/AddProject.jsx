import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../../redux/reducer/ProjectReducer";
export default function AddProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    shortcode: "",
    date: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const input = "w-full border border-slate-300 rounded-md p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const submit = () => {
    const err = Object.fromEntries(
      Object.entries(form)
        .filter(([_, v]) => !v.trim())
        .map(([k]) => [k, `${k} required`])
    );
    if (Object.keys(err).length)
      return setErrors(err);
    dispatch(addProject(form));
    navigate("/projects");
  };
  return (
    <div className="p-3 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-md p-5">
        <h1 className="text-lg font-semibold mb-5">Add Project</h1>
        <div className="space-y-4">
          {[
            ["Project Name", "name", "text"],
            ["Short Code", "shortcode", "text"],
            ["Project Date", "date", "date"]
          ].map(([label, name, type]) => (
            <div key={name}>
              <label className="text-sm block mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={change}
                placeholder={`Enter ${label}`}
                className={`${input} ${errors[name] && "border-red-500"}`}
              />
              {!!errors[name] && (
                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
          <div>
            <label className="text-sm block mb-1">Description</label>
            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={change}
              placeholder="Enter Description"
              className={`${input} resize-none ${errors.description && "border-red-500"}`}
            />
            {!!errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => navigate("/projects")}
              className="border border-slate-300 px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}