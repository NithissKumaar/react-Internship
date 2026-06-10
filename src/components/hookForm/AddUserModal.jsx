import { useForm } from "react-hook-form";
import { showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Save } from "lucide-react";

function AddUser() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const submit = (data) => {
    // data contains: name, username, email, phone, website
    showSuccess("New User added successfully");
    navigate("/users");
  };

  const inputStyle = `w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <UserPlus size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Add User</h1>
              <p className="text-slate-500 mt-1">Create and manage new users</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/users")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:bg-white cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <form autoComplete="off" onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Full Name</label>
                <input
                  placeholder="Enter full name"
                  className={inputStyle}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Username</label>
                <input
                  placeholder="Enter username"
                  className={inputStyle}
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className={inputStyle}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Phone</label>
                <input
                  placeholder="Enter phone"
                  className={inputStyle}
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="text-sm text-slate-600 mb-2 block">Website</label>
                <input
                  placeholder="Enter website"
                  className={inputStyle}
                  {...register("website", { required: "Website is required" })}
                />
                {errors.website && (
                  <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-10">
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md shadow-blue-200"
              >
                <Save size={18} />
                Save User
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AddUser;