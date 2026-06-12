import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchForms } from "../../redux/thunks/formThunk";
import { Star, ArrowLeft, FileText } from "lucide-react";

export default function FillForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms = [], loading } = useSelector((state) => state.forms);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => { if (forms.length === 0) dispatch(fetchForms()); }, [dispatch]);

  const form = forms.find((f) => String(f.id) === String(id));

  const setValue = (fieldId, value) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  const handleSubmit = () => {
    if (!form) return;
    const validation = {};
    form.fields.forEach((field) => {
      if (field.required) {
        const value = values[field.id];
        const invalid = value === undefined || value === "" || (field.type === "checkbox" && !value);
        if (invalid) validation[field.id] = `${field.label || "This field"} is required`;
      }
    });
    if (Object.keys(validation).length) { setErrors(validation); return; }
    const response = { id: Date.now(), formId: form.id, formTitle: form.title, submittedBy: localStorage.getItem("username") || "Employee", submittedRole: localStorage.getItem("role"), answers: values, submittedAt: new Date().toISOString() };
    const old = JSON.parse(localStorage.getItem("responses") || "[]");
    localStorage.setItem("responses", JSON.stringify([response, ...old]));
    navigate("/forms");
  };

  const inputStyle = (error) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${error ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"}`;

  const renderInput = (field) => {
    const value = values[field.id];
    const hasError = !!errors[field.id];
    switch (field.type) {
      case "dropdown":
        return (
          <select value={value || ""} className={inputStyle(hasError)} onChange={(e) => setValue(field.id, e.target.value)}>
            <option value="">Select an option</option>
            {field.options?.map((op) => <option key={op} value={op}>{op}</option>)}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((op) => (
              <label key={op} className="flex items-center gap-2">
                <input type="radio" checked={value === op} onChange={() => setValue(field.id, op)} />{op}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!value} onChange={(e) => setValue(field.id, e.target.checked)} />{field.placeholder || "I agree"}
          </label>
        );
      case "textarea":
        return <textarea rows={3} value={value || ""} placeholder={field.placeholder} className={inputStyle(hasError) + " resize-none"} onChange={(e) => setValue(field.id, e.target.value)} />;
      case "rating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.maxStars || 5 }).map((_, i) => (
              <Star key={i} size={24} onClick={() => setValue(field.id, i + 1)} className={`cursor-pointer ${value && i < value ? "fill-blue-500 text-blue-500" : "text-slate-330"}`} />
            ))}
          </div>
        );
      default:
        return <input type={field.type === "phone" ? "tel" : field.type} value={value || ""} placeholder={field.placeholder} className={inputStyle(hasError)} onChange={(e) => setValue(field.id, e.target.value)} />;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading form...</div>;
  if (!form) return <div className="min-h-screen flex flex-col items-center justify-center gap-3"><FileText /><h2>Form not found</h2></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-xl mx-auto">
        <button onClick={() => navigate("/forms")} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium mb-4"><ArrowLeft size={16} />Back to Forms</button>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-xl font-semibold">{form.title}</h1>
          <p className="text-sm text-slate-500 mt-1">Please fill out the form below</p>
          <div className="space-y-5 mt-7">
            {form.fields.map((field) => (
              <div key={field.id}>
                {field.type !== "checkbox" && <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</label>}
                {renderInput(field)}
                {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition">Submit</button>
        </div>
      </div>
    </div>
  );
}