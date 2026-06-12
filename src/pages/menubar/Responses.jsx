import { useSelector } from "react-redux";
import { User, Calendar, Inbox, Star, CheckCircle2, XCircle } from "lucide-react";

export default function Responses() {
  const responses = useSelector((state) => state.responses?.responses || []);
  const forms = useSelector((state) => state.forms?.forms || []);

  const getField = (formId, fieldId) => {
    const form = forms.find((f) => String(f.id) === String(formId));
    return form?.fields?.find((f) => String(f.id) === String(fieldId));
  };

  const getFieldName = (formId, fieldId) => {
    const field = getField(formId, fieldId);
    if (!field) return "";

    if (field.label?.trim()) return field.label;
    if (field.placeholder?.trim()) return field.placeholder;

    switch (field.type) {
      case "email":
        return "Email";
      case "phone":
        return "Phone";
      case "text":
        return "Text";
      case "number":
        return "Number";
      case "date":
        return "Date";
      case "dropdown":
        return "Selection";
      case "textarea":
        return "Description";
      case "radio":
        return "Choice";
      case "checkbox":
        return "Agreement";
      case "rating":
        return "Rating";
      default:
        return field.type;
    }
  };

  const renderValue = (formId, fieldId, value) => {
    const field = getField(formId, fieldId);

    if (value === undefined || value === "" || value === null) {
      return <span className="text-slate-400 italic">—</span>;
    }

    if (field?.type === "checkbox" || typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center gap-1.5 text-emerald-600">
          <CheckCircle2 size={18} />
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-slate-400">
          <XCircle size={18} />
          No
        </span>
      );
    }

    if (field?.type === "rating") {
      const max = field.maxStars || 5;
      return (
        <div className="flex items-center gap-1">
          {Array.from({ length: max }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < Number(value)
                  ? "fill-blue-500 text-blue-500"
                  : "text-slate-200"
              }
            />
          ))}
        </div>
      );
    }

    return <span>{value}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Submitted Forms
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review responses submitted by employees
        </p>
      </div>

      {responses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 flex flex-col items-center text-center">
          <div className="bg-blue-50 text-blue-600 rounded-full p-4 mb-4">
            <Inbox size={28} />
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            No responses yet
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Submitted form responses will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5 max-w-4xl">
          {responses.map((response) => (
            <div
              key={response.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  {response.formTitle}
                </h2>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  Submitted
                </span>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Submitted by</p>
                    <p className="text-sm font-medium text-slate-900">
                      {response.submittedBy || "Employee"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Date</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(response.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Answers */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                  Responses
                </h3>

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {Object.entries(response.answers || {}).map(
                    ([fieldId, value]) => (
                      <div
                        key={fieldId}
                        className="flex items-center justify-between gap-4 px-4 py-3 bg-white hover:bg-slate-50 transition"
                      >
                        <p className="text-sm text-slate-500">
                          {getFieldName(response.formId, fieldId)}
                        </p>
                        <div className="text-sm font-medium text-slate-900 text-right">
                          {renderValue(response.formId, fieldId, value)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}