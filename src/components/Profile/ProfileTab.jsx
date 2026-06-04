import Field, {
  profileFields,
} from "./ProfileFields";

import { Pencil } from "lucide-react";

function ProfileTab({
  user,
  setOpen,
}) {
  const fields = profileFields(user);

  return (
    <>
      <div className="mt-8">

        <h2 className="text-3xl font-bold">
          General
        </h2>

        <p className="text-slate-500 mt-2">
          Basic information about your account
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {fields.map((field, index) => (
          <Field
            key={index}
            {...field}
          />
        ))}

      </div>

      <div className="flex justify-end mt-10">

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-8 h-12 rounded-xl flex items-center gap-2 cursor-pointer"
        >
          <Pencil size={18} />
          Edit Profile
        </button>

      </div>
    </>
  );
}

export default ProfileTab;