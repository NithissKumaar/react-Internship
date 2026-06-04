import { useState } from "react";
import PasswordTab from "../components/Profile/PasswordTab";
import ProfileTab from "../components/Profile/ProfileTab";
import ActivityTab from "../components/Profile/ActivityTab";
import { Pencil } from "lucide-react";

import Field, {
  profileFields,
} from "../components/Profile/ProfileFields";

import EditProfile from "../components/hookForm/EditProfile";

function Profile() {
  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState("profile");

  const [user, setUser] = useState({
  username: "admin",
  firstName: "Nithiss",
  lastName: "Kumaar",
  email: "admin@gmail.com",
  phone: "+91 XXXXXXXXXX",
  website: "www.admin.com",
});

  const fields = profileFields(user);

  return (
    <>
      <div className="min-h-screen bg-slate-100 p-6">

        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8">

          {/* Tabs */}
          <div className="flex gap-10 border-b pb-4">

            <button
              onClick={() => setTab("profile")}
              className={`
                pb-2 cursor-pointer transition
                ${
                  tab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-500 hover:text-blue-500"
                }
              `}
            >
              Profile
            </button>

            <button
              onClick={() => setTab("password")}
              className={`
                pb-2 cursor-pointer transition
                ${
                  tab === "password"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-500 hover:text-blue-500"
                }
              `}
            >
              Password
            </button>

            <button
              onClick={() => setTab("activity")}
              className={`
                pb-2 cursor-pointer transition
                ${
                  tab === "activity"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-500 hover:text-blue-500"
                }
              `}
            >
              Account Activity
            </button>

          </div>

          {tab === "profile" &&
            <ProfileTab
               user={user}
                setOpen={setOpen}
            />
          }

          {tab === "password" &&
              <PasswordTab />
            }

          {tab === "activity" &&
            <ActivityTab />
            }

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