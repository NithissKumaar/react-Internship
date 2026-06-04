import { X } from "lucide-react";
import { useForm } from "react-hook-form";

function EditProfile({ user, setUser, close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const submit = (data) => {
    setUser({
      ...user,
      ...data,
    });

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-2xl font-bold">
              Edit Profile
            </h2>

            <p className="text-sm text-slate-500">
              Update your details
            </p>
          </div>

          <button
            onClick={close}
            className="cursor-pointer"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4"
        >

          {/* Name */}
          <div>
            <input
              placeholder="Name"
              {...register("name", {
                required: "Name required",
              })}
              className="w-full h-11 px-4 rounded-xl border"
            />

            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Disabled */}
          <input
            value={user.email}
            disabled
            className="w-full h-11 px-4 rounded-xl border bg-slate-100 text-slate-500"
          />

          {/* Phone */}
          <div>
            <input
              placeholder="Phone"
              {...register("phone")}
              className="w-full h-11 px-4 rounded-xl border"
            />
          </div>

          {/* Website */}
          <div>
            <input
              placeholder="Website"
              {...register("website")}
              className="w-full h-11 px-4 rounded-xl border"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={close}
              className="px-5 h-11 border rounded-xl cursor-pointer hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 h-11 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;