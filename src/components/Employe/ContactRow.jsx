import ActionButtons from "./ActionButtons";
import { relations } from "../../constants/relationOptions";

function ContactRow({index,register,errors,editable,addRow,deleteRow,}) {
  const input =
  "w-full p-2 rounded-lg border border-slate-400 bg-white text-slate-700 outline-none transition focus:border-blue-300 focus:ring-1 focus:ring-blue-100 disabled:bg-slate-400";

  const error = (field) =>
    errors?.contacts?.[index]?.[
      field
    ]?.message;

  return (
    <tr>

      <td className="p-4">
        {index + 1}
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
        <input
          disabled={!editable}
          placeholder="Name"
          className={input}
          {...register(
            `contacts.${index}.name`,
            {
              required:
                "Name required",
            }
          )}
        />
        <p className="text-red-500 text-xs">
          {error("name")}
        </p>
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
        <input
          disabled={!editable}
          placeholder="Mobile"
          className={input}
          {...register(
            `contacts.${index}.mobile`,
            {
              required:
                "Mobile required",
              pattern: {
                value:
                  /^[0-9]{10}$/,
                message:
                  "Enter 10 digits",
              },
            }
          )}
        />
        <p className="text-red-500 text-xs">
          {error("mobile")}
        </p>
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
        <input
          type="date"
          disabled={!editable}
          className={input}
          {...register(
            `contacts.${index}.dob`,
            {
              required:
                "DOB required",
            }
          )}
        />
        <p className="text-red-500 text-xs">
          {error("dob")}
        </p>
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]  ">
        <select
          disabled={!editable}
          className={`${input} ${editable ? "cursor-pointer" : "cursor-not-allowed"}`}
           
          {...register(
            `contacts.${index}.relation`,
            {
              required:
                "Required",
            }
          )}
        >
          <option value="">
            Select
          </option>

          {relations.map((r) => (
            <option
              key={r}
              value={r}
            
            >
              {r}
            </option>
          ))}
        </select>

        <p className="text-red-500 text-xs">
          {error("relation")}
        </p>
        </div>
      </td>

      <td className="p-3">
        <div className="min-h-[20px]">
        <input
          disabled={!editable}
          placeholder="Profession"
          className={input}
          {...register(
            `contacts.${index}.profession`,
            {
              required:
                "Profession required",
            }
          )}
        />

        <p className="text-red-500 text-xs">
          {error("profession")}
        </p>
        </div>
      </td>

      <td className="text-center">
        <div className="min-h-[20px]">
        <input
          type="checkbox"
          className="cursor-pointer"
          disabled={!editable}
          {...register(
            `contacts.${index}.emergency`
          )}
        />
        </div>
      </td>

      <td>
        <ActionButtons
          editable={editable}
          onAdd={() =>
            addRow(index)
          }
          onDelete={() =>
            deleteRow(index)
          }
        />
      </td>

    </tr>
  );
}

export default ContactRow;