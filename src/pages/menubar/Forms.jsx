import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchForms } from "../../redux/thunks/formThunk";
import { FileText, Plus, ArrowRight, Layers } from "lucide-react";

export default function Forms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms = [], loading } = useSelector((state) => state.forms);
  const role = localStorage.getItem("role") || "";

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  const openForm = (id) => {
    navigate(`/forms/fill/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Forms</h1>
          <p className="text-sm text-slate-500 mt-1">
            {forms.length} {forms.length === 1 ? "form" : "forms"} created
          </p>
        </div>
        {role?.toLowerCase() === "admin" && (
          <button
            type="button"
            onClick={() => navigate("/forms/create")}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            Create Form
          </button>
        )}
      </div>
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse">
              <div className="h-9 w-9 rounded-lg bg-slate-100 mb-5" />
              <div className="h-4 w-2/3 bg-slate-100 rounded mb-2" />
              <div className="h-3 w-1/3 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}
      {!loading && forms.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 flex flex-col items-center text-center">
          <div className="bg-blue-50 text-blue-600 rounded-full p-4 mb-4">
            <FileText size={28} />
          </div>
          <h2 className="text-base font-semibold text-slate-900">No forms yet</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Create your first form and it will show up here, ready to share and fill.
          </p>
          {role?.toLowerCase() === "admin" && (
            <button
              onClick={() => navigate("/forms/create")}
              className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              <Plus size={16} />
              Create Form
            </button>
          )}
        </div>
      )}
      {!loading && forms.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {forms.map((form) => (
            <div
              key={form.id}
              onClick={() => openForm(form.id)}
              className="group bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-blue-200 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5">
                  <FileText size={20} />
                </div>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium">
                  <Layers size={12} />
                  {form.fields?.length || 0} fields
                </span>
              </div>
              <h2 className="text-base font-semibold text-slate-900 truncate">{form.title}</h2>
              <p className="text-sm text-slate-500 mt-1">Click to fill out this form</p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openForm(form.id);
                  }}
                  className="flex items-center gap-1.5 text-blue-600 font-medium text-sm group-hover:gap-2.5 transition-all"
                >
                  Fill form
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}