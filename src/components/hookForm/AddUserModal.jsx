import { useForm } from "react-hook-form";
import { X } from "lucide-react";

function AddUserModal({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    alert(`User Added\n${data.name}`);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
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

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="p-5">

  <div className="grid grid-cols-2 gap-3">

    <input
      placeholder="Full Name"
      {...register("name", { required: true })}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />

    <input
      placeholder="Username"
      {...register("username")}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />

    <input
      type="email"
      placeholder="Email"
      {...register("email", { required: true })}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />

    <input
      placeholder="Phone"
      {...register("phone")}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />

    <input
      placeholder="Website"
      {...register("website")}
      className="col-span-1 h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />

  </div>

  <div className="flex justify-end gap-2 mt-5">

    <button
      type="button"
      onClick={close}
      className="px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-50"
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