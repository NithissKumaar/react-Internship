import ContactRow from "./ContactRow";

function ContactTable({ fields, register, errors, addRow, deleteRow }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[950px]">
          <thead className="bg-blue-100 border-b border-slate-400">
            <tr className="text-left text-slate-700">
              <th className="px-4 sm:px-6 py-4 font-medium rounded-tl-2xl">S.NO</th>
              <th className="px-4 sm:px-6 py-4 font-medium">Name</th>
              <th className="px-4 sm:px-6 py-4 font-medium">Mobile</th>
              <th className="px-4 sm:px-6 py-4 font-medium">DOB</th>
              <th className="px-4 sm:px-6 py-4 font-medium">Relation</th>
              <th className="px-4 sm:px-6 py-4 font-medium">Profession</th>
              <th className="px-4 sm:px-6 py-4 font-medium text-center">Emergency</th>
              <th className="px-4 sm:px-6 py-4 font-medium text-center rounded-tr-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <ContactRow
                key={item.id}
                item={item}
                index={index}
                register={register}
                errors={errors}
                editable={!item.saved}
                addRow={addRow}
                deleteRow={deleteRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactTable;