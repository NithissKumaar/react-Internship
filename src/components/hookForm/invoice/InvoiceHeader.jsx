import { useFormContext } from "react-hook-form";

export default function InvoiceHeader() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Customer Name
        </label>
        <input
          placeholder="Enter customer name"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
          {...register("customerName", {
            required: "Customer name is required",
          })}
        />
        {errors.customerName && (
          <p className="text-xs text-red-500 mt-1">
            {errors.customerName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Invoice Date
        </label>
        <input
          type="date"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
          {...register("invoiceDate", { required: true })}
        />
      </div>
    </div>
  );
}