import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserPlus, ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { addUser } from "../../../redux/reducer/UserReducer";

function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onChange",
  });

  const submit = (data) => {
    dispatch(addUser({ ...data, createdAt: new Date().toLocaleDateString() }));
    toast.success("User added successfully!");
    reset();
    navigate("/users");
  };

  const input = `w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <UserPlus size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Add User</h1>
              <p className="text-slate-500">Create and manage users</p>
            </div>
          </div>
          <button type="button" onClick={() => navigate("/users")} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-white cursor-pointer">
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <form autoComplete="off" onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm mb-2 block">Full Name</label>
                <input placeholder="Enter full name" className={input} {...register("name", { required: "Name required" })} />
                <p className="text-red-500 text-xs">{errors.name?.message}</p>
              </div>

              <div>
                <label className="text-sm mb-2 block">Username</label>
                <input placeholder="Enter username" className={input} {...register("username", { required: "Username required" })} />
                <p className="text-red-500 text-xs">{errors.username?.message}</p>
              </div>

              <div>
                <label className="text-sm mb-2 block">Email</label>
                <input type="email" placeholder="Enter email" className={input} {...register("email", { required: "Email required" })} />
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </div>

              <div>
                <label className="text-sm mb-2 block">Phone</label>
                <input placeholder="Enter phone" className={input} {...register("phone", { required: "Phone required" })} />
                <p className="text-red-500 text-xs">{errors.phone?.message}</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm mb-2 block">Website</label>
                <input placeholder="Enter website" className={input} {...register("website", { required: "Website required" })} />
                <p className="text-red-500 text-xs">{errors.website?.message}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-10">
              <button type="button" onClick={() => navigate("/users")} className="px-6 py-3 rounded-xl border border-slate-400 hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                <Save size={18} /> Save User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;