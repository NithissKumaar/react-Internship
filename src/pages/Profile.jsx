import { useState } from "react";
import {User,Mail,Phone,Globe,Pencil,} from "lucide-react";

import EditProfile from "../components/hookForm/EditProfile";

function Profile() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@gmail.com",
    phone: "+91 9876543210",
    website: "www.admin.com",
  });

  const details = [
    { icon: <User size={18} />, value: user.name },
    { icon: <Mail size={18} />, value: user.email },
    { icon: <Phone size={18} />, value: user.phone },
    { icon: <Globe size={18} />, value: user.website },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-100 rounded-xl p-6">

        <div className="max-w-5xl mx-auto grid lg:grid-cols-[300px_1fr] gap-6">

          <div className="bg-white rounded-3xl p-8 shadow-sm border">

            <div className="flex flex-col items-center">

              <div className="w-28 h-28 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
                AD
              </div>

              <h1 className="mt-5 text-2xl font-bold">
                {user.name}
              </h1>

              <p className="text-slate-500">
                Frontend Developer
              </p>

              <button
                onClick={() => setOpen(true)}
                className="mt-6 px-5 h-11 rounded-xl bg-blue-600 text-white flex items-center gap-2 cursor-pointer"
              >
                <Pencil size={16} />
                Edit Profile
              </button>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 border">

            <h2 className="text-xl font-semibold mb-6">
              Personal Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {details.map((item, i) => (
                <div
                  key={i}
                  className="border rounded-2xl p-5"
                >
                  <div className="flex gap-3">

                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {item.icon}
                    </div>

                    <p className="font-medium">
                      {item.value}
                    </p>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {open && (
        <EditProfile
          user={user}
          setUser={setUser}
          close={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default Profile;