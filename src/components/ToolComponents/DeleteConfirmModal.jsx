import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title = "Delete Item", message = "Are you sure you want to permanently delete this item? This action cannot be undone." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/40 animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-100 p-6 w-full max-w-sm shadow-2xl scale-100 transform transition-all duration-200 ease-out">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="p-2.5 bg-red-50 rounded-xl text-red-600">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Warning</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-xl cursor-pointer shadow-lg shadow-red-600/20 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}