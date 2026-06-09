import ActionButtons from "./ActionButtons";
import { relations } from "../../../constants/relationOptions";

function ContactRow({ index, register, errors, editable, addRow, deleteRow }) {
  const input = "w-full min-w-[120px] p-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 outline-none transition-all duration-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50 disabled:border-slate-100";
  const error = (field) => errors?.contacts?.[index]?.[field]?.message || "";

  return (
    <tr>
      <td className="p-4">{index + 1}</td>

      <td className="p-3">
        <div className="min-h-[20px]">
          <input autoComplete="off" disabled={!editable} placeholder="Name" className={input} {...register(`contacts.${index}.name`, { required: "Name required" })} />
          {error("name") && <p className="text-red-500 text-xs mt-1">{error("name")}</p>}
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
          <input autoComplete="off" disabled={!editable} placeholder="Mobile" className={input} {...register(`contacts.${index}.mobile`, { required: "Mobile required", pattern: { value: /^[0-9]{10}$/, message: "Enter 10 digits" } })} />
          {error("mobile") && <p className="text-red-500 text-xs mt-1">{error("mobile")}</p>}
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
          <input type="date" autoComplete="off" disabled={!editable} className={input} {...register(`contacts.${index}.dob`, { required: "DOB required" })} />
          {error("dob") && <p className="text-red-500 text-xs mt-1">{error("dob")}</p>}
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
          <select disabled={!editable} className={`${input} ${editable ? "cursor-pointer" : "cursor-not-allowed"}`} {...register(`contacts.${index}.relation`, { required: "Required" })}>
            <option value="">Select</option>
            {relations.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {error("relation") && <p className="text-red-500 text-xs mt-1">{error("relation")}</p>}
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
          <input autoComplete="off" disabled={!editable} placeholder="Profession" className={input} {...register(`contacts.${index}.profession`, { required: "Profession required" })} />
          {error("profession") && <p className="text-red-500 text-xs mt-1">{error("profession")}</p>}
        </div>
      </td>

      <td className="text-center p-3">
        <input type="checkbox" disabled={!editable} className="w-4 h-4 cursor-pointer" {...register(`contacts.${index}.emergency`)} />
      </td>

      <td className="p-3">
        <ActionButtons editable={editable} onAdd={() => addRow(index)} onDelete={() => deleteRow(index)} />
      </td>
    </tr>
  );
}

export default ContactRow;