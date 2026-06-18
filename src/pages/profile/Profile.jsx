import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAdminInfo } from "../../redux/thunks/authThunk";
import PasswordTab from "./tabs/PasswordTab";
import ProfileTab from "./tabs/ProfileTab";
import ActivityTab from "./tabs/ActivityTab";
import EditProfile from "../../components/hookForm/EditProfile";

function Profile() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState({
    username: "",
    AdminName: "",
    email: "",
  });

  const fetchProfile = async () => {
    const result = await dispatch(getAdminInfo());
    console.log("PROFILE", result.payload);
    if (getAdminInfo.fulfilled.match(result)) {
      const u = result.payload?.data?.user || result.payload?.user;
      setUser({
        username: u?.username || "",
        AdminName: u?.admin_name || "",
        email: u?.admin_email || "",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8">
          <div className="relative">
            <div className="flex gap-10 border-b border-slate-300">
              <button
                onClick={() => setTab("profile")}
                className={`pb-5 cursor-pointer transition ${tab === "profile" ? "text-blue-600" : "text-slate-500"}`}
              >
                Profile
              </button>
              <button
                onClick={() => setTab("password")}
                className={`pb-5 cursor-pointer transition ${tab === "password" ? "text-blue-600" : "text-slate-500"}`}
              >
                Password
              </button>
              <button
                onClick={() => setTab("activity")}
                className={`pb-5 cursor-pointer transition ${tab === "activity" ? "text-blue-600" : "text-slate-500"}`}
              >
                Account Activity
              </button>
            </div>
            <div
              className={`absolute bottom-0 h-[3px] bg-blue-600 rounded-full transition-all duration-300 ${
                tab === "profile"
                  ? "left-0 w-[45px]"
                  : tab === "password"
                  ? "left-[80px] w-[75px]"
                  : "left-[185px] w-[120px]"
              }`}
            ></div>
          </div>
          {tab === "profile" && <ProfileTab user={user} setOpen={setOpen} />}
          {tab === "password" && <PasswordTab />}
          {tab === "activity" && <ActivityTab />}
        </div>
      </div>
      {open && <EditProfile user={user} setUser={setUser} close={() => setOpen(false)} />}
    </>
  );
}

export default Profile;