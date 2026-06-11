import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../../utils/toast";
import { addEmployee } from "../../../redux/reducer/EmployeeReducer";
import { User, MapPin, Briefcase, CheckCircle, ArrowLeft } from "lucide-react";

export default function EmployeeRegistration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const { register, trigger, getValues, reset, formState: { errors } } = useForm({
    mode: "onChange",
  });

  const tabs = [
    { title: "Personal", icon: User },
    { title: "Address", icon: MapPin },
    { title: "Employment", icon: Briefcase },
    { title: "Review", icon: CheckCircle },
  ];

  const next = async () => {
    const map = {
      1: ["name", "email", "phone", "dob"],
      2: ["address", "city", "state", "pincode"],
      3: ["department", "designation", "salary"],
    };
    const valid = await trigger(map[step]);
    if (valid) {
      setStep(step + 1);
    }
  };

  const previous = () => setStep(step - 1);

  const submit = () => {
    dispatch(addEmployee(getValues()));
    showSuccess("Employee Registered Successfully");
    reset();
    setStep(1);
    navigate("/employee");
  };

  const values = getValues();

  const renderInput = (name, placeholder, type = "text") => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${placeholder} is required` })}
        className="w-full border border-slate-200 rounded-md px-3 py-2.5 outline-none hover:border-slate-300 focus:border-blue-500 transition"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="p-3 bg-slate-50 min-h-screen">
      
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/employee")}
          className="w-10 h-10 bg-white rounded-md flex justify-center items-center shadow-sm cursor-pointer hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-semibold">Employee Registration</h1>
          <p className="text-xs text-slate-500">Register employee</p>
        </div>
      </div>

  
      <div className="bg-white rounded-md mb-3">
        <div className="flex">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.title}
                className={`flex-1 flex items-center justify-center gap-2 py-5 border-b-2 transition ${step === i + 1 ? "border-blue-600 text-blue-600 bg-blue-50" : "text-slate-400 border-transparent"}`}
              >
                <Icon size={18} />
                {tab.title}
              </div>
            );
          })}
        </div>
      </div>


      <div className="bg-white rounded-md p-5">
        <div className="grid grid-cols-2 gap-4">
          {step === 1 && (
            <>
              {renderInput("name", "Name")}
              {renderInput("email", "Email")}
              {renderInput("phone", "Phone")}
              {renderInput("dob", "DOB", "date")}
            </>
          )}

          {step === 2 && (
            <>
              {renderInput("address", "Address")}
              {renderInput("city", "City")}
              {renderInput("state", "State")}
              {renderInput("pincode", "Pincode")}
            </>
          )}

          {step === 3 && (
            <>
              {renderInput("department", "Department")}
              {renderInput("designation", "Designation")}
              {renderInput("salary", "Salary")}
            </>
          )}

          {step === 4 && (
  <div className="col-span-2">
    <div className="bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl px-6 py-5 text-white mb-5">
      <h2 className="text-lg font-semibold">Review Employee Details</h2>
      <p className="text-sm text-blue-100 mt-1">Verify all information before submitting.</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {[
        ["Name", values.name],
        ["Email", values.email],
        ["Phone", values.phone],
        ["Date Of Birth", values.dob],
        ["Address", values.address],
        ["City", values.city],
        ["State", values.state],
        ["Pincode", values.pincode],
        ["Department", values.department],
        ["Designation", values.designation],
        ["Salary", values.salary],
      ].map(([label, value]) => (
        <div key={label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p className="text-xs uppercase text-slate-400 tracking-wide">{label}</p>
          <h3 className="mt-2 text-slate-800 font-medium">{value || "-"}</h3>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
        <div className="flex justify-between mt-6">
          <div>
            {step > 1 && (
              <button
                onClick={previous}
                className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Previous
              </button>
            )}
          </div>

          {step < 4 ? (
            <button
              onClick={next}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}