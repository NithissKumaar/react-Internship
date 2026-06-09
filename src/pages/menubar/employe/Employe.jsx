import ContactTable from "./ContactTable";
import useFamilyContactForm from "../../../components/hookForm/useFamilyContactForm";

function Employe() {
  const { register, errors, fields, addRow, deleteRow } = useFamilyContactForm();

  return (
    <div className="p-3 sm:p-5 md:p-6 bg-slate-50 min-h-screen">
      <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Family Profile</h1>
          <p className="text-sm sm:text-base text-slate-500">Manage Family Contacts</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <ContactTable fields={fields} register={register} errors={errors} addRow={addRow} deleteRow={deleteRow} />
      </div>
    </div>
  );
}

export default Employe;