import { useForm, useFieldArray } from "react-hook-form";

export default function useFamilyContactForm() {
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",

    defaultValues: {
      contacts: [
        {
          name: "",
          mobile: "",
          dob: "",
          relation: "",
          profession: "",
          emergency: false,
        },
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "contacts",
  });

  const addRow = async (index) => {
    const valid =
      await trigger([
        `contacts.${index}.name`,
        `contacts.${index}.mobile`,
        `contacts.${index}.dob`,
        `contacts.${index}.relation`,
        `contacts.${index}.profession`,
      ]);

    if (!valid) return;

    append({
      name: "",
      mobile: "",
      dob: "",
      relation: "",
      profession: "",
      emergency: false,
    });
  };

  const deleteRow = (index) => {
    remove(index);

    if (
      fields.length === 1
    ) {
      append({
        name: "",
        mobile: "",
        dob: "",
        relation: "",
        profession: "",
        emergency: false,
      });
    }
  };

  return {
    register,
    errors,
    fields,
    addRow,
    deleteRow,
  };
}