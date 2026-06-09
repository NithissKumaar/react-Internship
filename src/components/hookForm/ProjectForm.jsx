import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../redux/reducer/ProjectReducer";

function ProjectForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    dispatch(addProject(data));
    reset();
    navigate("/projects");
  };

  return (
    <div className="p-3 bg-slate-50 min-h-screen">
      <div className="bg-white border border-slate-200 rounded-md p-5">
        <h1 className="text-lg font-semibold mb-1">Add Project</h1>
        <p className="text-xs text-slate-500 mb-5">Manage Projects</p>

        <form onSubmit={handleSubmit(submit)}>
          <input {...register("name")} placeholder="Project Name" className="border border-slate-200 p-2 rounded-md w-full mb-3" />
          <input {...register("shortcode")} placeholder="Short Code" className="border border-slate-200 p-2 rounded-md w-full mb-3" />
          <input type="date" {...register("date")} className="border border-slate-200 p-2 rounded-md w-full mb-3" />
          <textarea {...register("description")} placeholder="Description" className="border border-slate-200 p-2 rounded-md w-full mb-3" />
          
          <select {...register("status")} className="border border-slate-200 p-2 rounded-md w-full mb-4">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;