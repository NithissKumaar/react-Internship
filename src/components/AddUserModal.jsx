import { useForm } from "react-hook-form";

function AddUserModal({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    alert(
      `User Added\nName: ${data.name}\nEmail: ${data.email}`
    );

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-5">
          Add User
        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full p-3 border rounded-xl"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full p-3 border rounded-xl"
          />

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full p-3 border rounded-xl"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone")}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Website"
            {...register("website")}
            className="w-full p-3 border rounded-xl"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border rounded-xl cursor-pointer hover:bg-slate-100  active:scale-[0.95]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-700  active:scale-[0.95]"
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