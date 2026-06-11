import { useState } from "react";
import { useForm } from "react-hook-form";
import { showSuccess } from "../../utils/toast";

export default function useEmployeeRegistrationForm() {

  const [step, setStep] = useState(1);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",

      address: "",
      city: "",
      state: "",
      pincode: "",

      department: "",
      designation: "",
      salary: "",
    },
  });

  const next = async () => {

    let fields = [];

    if (step === 1) {
      fields = [
        "name",
        "email",
        "phone",
        "dob",
      ];
    }

    if (step === 2) {
      fields = [
        "address",
        "city",
        "state",
        "pincode",
      ];
    }

    if (step === 3) {
      fields = [
        "department",
        "designation",
        "salary",
      ];
    }

    const valid =
      await trigger(fields);

    if (!valid) return;

    setStep((prev) => prev + 1);
  };

  const previous = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const submit = () => {

    const employee =
      getValues();

    const employees =
      JSON.parse(
        localStorage.getItem(
          "employees"
        )
      ) || [];

    employees.push(employee);

    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );

    showSuccess(
      "Employee Registered"
    );

    setStep(1);
  };

  return {
    register,
    errors,
    step,
    next,
    previous,
    submit,
    values: getValues(),
  };
}