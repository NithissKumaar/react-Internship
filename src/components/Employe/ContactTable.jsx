import ContactRow from "./ContactRow";

function ContactTable({
  fields,
  register,
  errors,
  addRow,
  deleteRow,
}) {
  return (
    <div className="overflow-auto bg-white rounded-md shadow border-1">

      <table className="w-full">

        <thead className="bg-slate-200 border-b">

  <tr className="text-left text-slate-700">

    <th className="px-6 py-4 font-semibold rounded-tl-xl ">
      S.NO
    </th>

    <th className="px-6 py-4 font-semibold">
      Name
    </th>

    <th className="px-6 py-4 font-semibold">
      Mobile
    </th>

    <th className="px-6 py-4 font-semibold">
      DOB
    </th>

    <th className="px-6 py-4 font-semibold">
      Relation
    </th>

    <th className="px-6 py-4 font-semibold">
      Profession
    </th>

    <th className="px-6 py-4 font-semibold text-center">
      Emergency
    </th>

    <th className="px-6 py-4 font-semibold text-center rounded-tr-xl">
      Action
    </th>

  </tr>

</thead>

        <tbody>

          {fields.map(
            (item, index) => (

              <ContactRow
                key={item.id}
                item={item}
                index={index}
                register={register}
                errors={errors}
                editable={
                  index ===
                  fields.length - 1
                }
                addRow={addRow}
                deleteRow={deleteRow}
              />

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default ContactTable;