import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchForms } from "../../redux/thunks/formThunk";
import { Star, ArrowLeft, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function FillForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms = [], loading } = useSelector((state) => state.forms);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (forms.length === 0) {
      dispatch(fetchForms());
    }
  }, [dispatch, forms.length]);

  const form = forms.find((f) => String(f.id) === String(id));

  const setValue = (fieldId, value) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: undefined }));
  };

  const validate = () => {
    const validation = {};
    form.fields.forEach((field) => {
      const value = values[field.id];
      if (field.required) {
        const invalid = value == null || String(value).trim() === "" || (field.type === "checkbox" && !value);
        if (invalid) {
          validation[field.id] = `${field.label} is required`;
          return;
        }
      }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        validation[field.id] = "Enter valid email";
      }
    });
    setErrors(validation);
    return Object.keys(validation).length === 0;
  };

  const handleSubmit = () => {
    if (!form) return;
    const valid = validate();
    if (!valid) {      
      return;
    }
    let old = [];
    try {
      old = JSON.parse(localStorage.getItem("responses")) || [];
    } catch {}
    const response = {
      id: Date.now(),
      formId: form.id,
      formTitle: form.title,
      submittedBy: localStorage.getItem("username") || "Employee",
      submittedRole: localStorage.getItem("role"),
      answers: values,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("responses", JSON.stringify([response, ...old]));
    toast.success("Form submitted successfully!");
    navigate("/forms");
  };

  const inputStyle = (error) => `w-full rounded-lg border px-3 py-2 text-sm transition ${error ? "border-red-500" : "border-slate-300"}`;

  const renderInput = (field) => {
    const value = values[field.id];
    const hasError = !!errors[field.id];
    switch (field.type) {
      case "dropdown":
        return (
          <select value={value || ""} className={inputStyle(hasError)} onChange={(e) => setValue(field.id, e.target.value)}>
            <option value="">Select</option>
            {field.options?.map((op) => <option key={op}>{op}</option>)}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((op) => (
              <label key={op} className="flex gap-2">
                <input type="radio" name={field.id} checked={value === op} onChange={() => setValue(field.id, op)} />
                {op}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <label className="flex gap-2">
            <input type="checkbox" checked={!!value} onChange={(e) => setValue(field.id, e.target.checked)} />
            {field.placeholder || "I agree"}
          </label>
        );
      case "rating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.maxStars || 5 }).map((_, i) => (
              <Star key={i} size={24} onClick={() => setValue(field.id, i + 1)} className={`cursor-pointer ${value && i < value ? "fill-blue-500 text-blue-500" : "text-slate-300"}`} />
            ))}
          </div>
        );
      default:
        return <input type={field.type === "phone" ? "tel" : field.type} value={value || ""} placeholder={field.placeholder} className={inputStyle(hasError)} onChange={(e) => setValue(field.id, e.target.value)} />;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!form) {
    return <div className="min-h-screen flex flex-col justify-center items-center"><FileText />Form not found</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-xl mx-auto">
        <button onClick={() => navigate("/forms")} className="flex items-center gap-1 text-sm text-gray-600 mb-4 cursor-pointer hover:text-gray-900">
          <ArrowLeft  size={14}/>Back
        </button>
        <div className="bg-white rounded-xl p-8">
          <h1>{form.title}</h1>
          <div className="space-y-5 mt-6">
            {form.fields.map((field) => (
              <div key={field.id}>
                {field.type !== "checkbox" && <label>{field.label}</label>}
                {renderInput(field)}
                {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]}</p>}
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}