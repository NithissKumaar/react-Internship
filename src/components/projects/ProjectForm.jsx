import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/projectSlice";

function ProjectForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    shortcode: "",
    date: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    if (!form.name || !form.shortcode || !form.date)
      return;

    dispatch(addProject(form));

    setForm({
      name: "",
      shortcode: "",
      date: "",
    });
  };

  return (
    <div className="border p-4 rounded">
      <h2>Add Project</h2>

      <input
        name="name"
        placeholder="Project Name"
        value={form.name}
        onChange={change}
        className="border p-2 w-full mb-2"
      />

      <input
        name="shortcode"
        placeholder="Short Code"
        value={form.shortcode}
        onChange={change}
        className="border p-2 w-full mb-2"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={change}
        className="border p-2 w-full"
      />

      <button
        onClick={submit}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Project
      </button>
    </div>
  );
}

export default ProjectForm;