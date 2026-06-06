import { useForm } from "react-hook-form";
import { showSuccess } from "../../utils/toast";
import { X } from "lucide-react";

function AddUserModal({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
  showSuccess(
    "New User added successfully"
  );

  close();
};

  
const input =
"w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm outline-none transition focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-200";

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl">

        <div className="flex justify-between items-center p-6 border-b border-slate-200">

          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              Add User
            </p>

            <h2 className="text-2xl font-bold text-slate-800">
              Create user
            </h2>
          </div>

          <button
            onClick={close}
            className="text-slate-400 hover:text-black cursor-pointer"
          >
            <X size={22} />
          </button>

        </div>

        <form
        autoComplete="off"
          onSubmit={handleSubmit(submit)}
          className="p-5"
        >

          <div className="grid grid-cols-2 gap-3">

            <div className="flex flex-col gap-1">

              <input
                placeholder="Full Name"
                {...register("name", {
                  required:
                    "Name is required",
                })}
                className={input}
              />

              {errors.name && (
                <p className="text-red-500 text-xs">
                  {errors.name.message}
                </p>
              )}

            </div>

            <div className="flex flex-col gap-1">

              <input
                placeholder="Username"
                {...register(
                  "username",
                  {
                    required:
                      "Username is required",
                  }
                )}
                className={input}
              />

              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}

            </div>

            <div className="flex flex-col gap-1">

              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required:
                    "Email is required",
                })}
                className={input}
              />

              {errors.email && (
                <p className="text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}

            </div>

            <div className="flex flex-col gap-1">

              <input
                placeholder="Phone"
                {...register("phone", {
                  required:
                    "Phone is required",
                })}
                className={input}
              />

              {errors.phone && (
                <p className="text-red-500 text-xs">
                  {errors.phone.message}
                </p>
              )}

            </div>

            <div className="flex flex-col gap-1">

              <input
                placeholder="Website"
                {...register("website", {
                  required:
                    "Website is required",
                })}
                className={input}
              />

              {errors.website && (
                <p className="text-red-500 text-xs">
                  {errors.website.message}
                </p>
              )}

            </div>

          </div>

          <div className="flex justify-end gap-2 mt-5">

            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddUserModal;