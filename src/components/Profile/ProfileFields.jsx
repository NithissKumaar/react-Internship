import {
  User,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

export const profileFields = (user) => [
  
  {
    label: "First Name",
    icon: <User size={18} />,
    value: user.firstName,
  },

  {
    label: "Last Name",
    icon: <User size={18} />,
    value: user.lastName,

  },
  {
    label: "Username",
    icon: <User size={18} />,
    value: user.username,
  },

  {
    label: "Email",
    icon: <Mail size={18} />,
    value: user.email,
  },

  {
    label: "Phone",
    icon: <Phone size={18} />,
    value: user.phone,
  },

  {
    label: "Website",
    icon: <Globe size={18} />,
    value: user.website,
  },
];

function Field({
  label,
  icon,
  value,
  disabled,
}) {
  return (
    <div>

      <label className="block font-medium mb-2">
        {label}
      </label>

      <div
        className={`
          flex items-center gap-3
          h-12 px-4 rounded-xl border
          ${disabled ? "bg-slate-100" : ""}
        `}
      >

        <div className="text-slate-400">
          {icon}
        </div>

        <input
          value={value}
          disabled
          readOnly
          className="w-full bg-transparent outline-none"
        />

      </div>

    </div>
  );
}

export default Field;