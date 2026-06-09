import { useState } from "react";
import PasswordTab from "./tabs/PasswordTab";
import ProfileTab from "./tabs/ProfileTab";
import ActivityTab from "./tabs/ActivityTab";
import { Pencil } from "lucide-react";
import Field, {profileFields,} from "./ProfileFields";
import EditProfile from "../../components/hookForm/EditProfile";

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

    <div className="relative">
      <div className="flex gap-10 border-b border-slate-300">

        <button
          onClick={() => setTab("profile")}
          className={`pb-5 cursor-pointer transition-colors duration-300
            ${
              tab === "profile"
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-500"
            }`}
        >
          Profile
        </button>

        <button
          onClick={() => setTab("password")}
          className={`pb-5 cursor-pointer transition-colors duration-300
            ${
              tab === "password"
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-500"
            }`}
        >
          Password
        </button>

        <button
          onClick={() => setTab("activity")}
          className={`pb-5 cursor-pointer transition-colors duration-300
            ${
              tab === "activity"
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-500"
            }`}
        >
          Account Activity
        </button>
      </div>

      <div
        className={`absolute bottom-0 h-[3px] bg-blue-600 rounded-full
        transition-all duration-300 ease-in-out
        ${
          tab === "profile"
            ? "left-0 w-[45px]"
            : tab === "password"
            ? "left-[80px] w-[75px]"
            : "left-[187px] w-[120px]"
        }`}
      />
    </div>

    {tab === "profile" && (
      <ProfileTab user={user} setOpen={setOpen} />
    )}

    {tab === "password" && <PasswordTab />}

    {tab === "activity" && <ActivityTab />}
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