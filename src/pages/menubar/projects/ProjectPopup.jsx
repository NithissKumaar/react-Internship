import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const STATUS_STYLES = {
  "Not Started": "bg-blue-50 text-blue-600 border border-blue-200",
  "In Progress":  "bg-amber-50 text-amber-600 border border-amber-200",
  "Completed":    "bg-emerald-50 text-emerald-600 border border-emerald-200",
};

function Row({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-xs font-medium text-slate-800">{value || "—"}</p>
    </div>
  );
}

export default function ProjectPopup({ project, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES["Not Started"];

  return createPortal(
    <div className="fixed z-[9999] animate-popup top-16 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 md:right-6 w-[92vw] max-w-[320px]">
      <div ref={popupRef} className="w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Project Details</h3>
            <p className="text-xs text-slate-400 mt-0.5">Overview</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-3.5 max-h-[70vh] overflow-y-auto">
          <Row label="Project Name" value={project.name} />
          <Row label="Short Code"   value={project.shortcode} />
          <Row label="Date"         value={project.date} />
          <div>
            <p className="text-xs text-slate-400 mb-1">Status</p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
              {project.status || "Not Started"}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Description</p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}