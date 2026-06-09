import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../../redux/reducer/FamilyReducer";
import { useEffect } from "react";

export default function useFamilyContactForm() {
  const dispatch = useDispatch();
  const stored = useSelector((state) => state.family.contacts);

  const emptyRow = {
    name: "",
    mobile: "",
    dob: "",
    relation: "",
    profession: "",
    emergency: false,
    saved: false,
  };

  const contacts = stored.length ? stored : JSON.parse(localStorage.getItem("familyContacts")) || [];
  const initial = contacts.length ? [...contacts] : [emptyRow];

  if (initial.at(-1)?.saved) {
    initial.push({ ...emptyRow });
  }

  const { register, control, trigger, getValues, reset, formState: { errors } } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { contacts: initial },
  });

  const { fields, replace } = useFieldArray({ control, name: "contacts" });

  useEffect(() => {
    replace(initial);
  }, []);

  const save = (rows) => {
    dispatch(setContacts(rows));
    localStorage.setItem("familyContacts", JSON.stringify(rows));
  };

  const addRow = async (index) => {
    const valid = await trigger([
      `contacts.${index}.name`,
      `contacts.${index}.mobile`,
      `contacts.${index}.dob`,
      `contacts.${index}.relation`,
      `contacts.${index}.profession`,
    ]);

    if (!valid) return;

    let rows = getValues("contacts");
    rows[index] = { ...rows[index], saved: true };
    rows.push({ ...emptyRow });

    reset({ contacts: rows });
    save(rows);
  };

  const deleteRow = (index) => {
    let rows = getValues("contacts").filter((_, i) => i !== index);
    if (rows.length === 0) {
      rows = [{ ...emptyRow }];
    }
    reset({ contacts: rows });
    save(rows);
  };

  return { register, errors, fields, addRow, deleteRow };
}