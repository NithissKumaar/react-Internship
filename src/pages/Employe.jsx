
import ContactTable from "../components/Employe/ContactTable";
import useFamilyContactForm from "../components/hookForm/useFamilyContactForm";

function Employe() {
  const {
  register,
  errors,
  fields,
  addRow,
  deleteRow,
} =
  useFamilyContactForm();

  return (
    <>
      

      <div className="p-6 bg-slate-50 rounded-xl">
<div className="py-3">
    <h1 className="text-3xl font-bold">
          Family Profile
        </h1>

</div>
        
        
        <ContactTable
  fields={fields}
  register={register}
  errors={errors}
  addRow={addRow}
  deleteRow={deleteRow}
/>

      </div>
    </>
  );
}

export default Employe;