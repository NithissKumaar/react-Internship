import { User, Mail } from "lucide-react";

export const profileFields = (user) => [
  {
    label: "Username",
    icon: <User size={18} />,
    value: user?.username || "",
  },
  {
    label: "Admin Name",
    icon: <User size={18} />,
    value: user?.AdminName || "",
  },
  {
    label: "Email",
    icon: <Mail size={18} />,
    value: user?.email || "",
  },
];

function Field({ label, icon, value, disabled }) {
  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <div
        className={`flex items-center gap-3 h-12 px-4 rounded-xl border border-slate-300 ${
          disabled ? "bg-slate-100" : "bg-white"
        }`}
      >
        <div className="text-slate-400">{icon}</div>
        <input
          type="text"
          value={value || "" }
          readOnly
          disabled
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

export default Field;