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

        
        <form onSubmit={handleSubmit(submit)} className="p-5">

  <div className="grid grid-cols-2 gap-3">
    <div  className="flex flex-col gap-1">
      <input
      placeholder="Full Name"
      {...register("name", {
         required: "Name is required" })}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />
    {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}


    </div>
    <div  className="flex flex-col gap-1">
      <input
      placeholder="Username"
      {...register("username",{required : "Usernmae is required"})}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />
    {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}

    </div>
    
    
            <div  className="flex flex-col gap-1">
              <input
      type="email"
      placeholder="Email"
      {...register("email", {required : "Email is required"})}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />
    {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}

            </div>

    
            <div  className="flex flex-col gap-1">
              <input
      placeholder="Phone"
      {...register("phone",{required : "Phone is required"})}
      className="h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />
    {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}

            </div>

    
            <div  className="flex flex-col gap-1">
              <input
      placeholder="Website"
      {...register("website",{required : "Website is required"})}
      className="col-span-1 h-10 px-3 rounded-lg border bg-slate-50 text-sm"
    />
    {errors.website && (
              <p className="text-red-500 text-xs mt-1">
                {errors.website.message}
              </p>
            )}

            </div>

    

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