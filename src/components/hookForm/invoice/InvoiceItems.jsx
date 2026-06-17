import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../../../utils/invoiceCalculation";

export default function InvoiceItems() {
  const { control, register, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const rows = watch("items") || [];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Invoice Items
        </h2>

        <button
          type="button"
          onClick={() => append({ itemName: "", quantity: 1, rate: 0 })}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
        >
          <Plus size={15} />
          Add Item
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-blue-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
              <th className="p-3 font-medium w-1/2">Item Description</th>
              <th className="p-3 font-medium text-center w-20">Qty</th>
              <th className="p-3 font-medium text-center w-28">Rate (₹)</th>
              <th className="p-3 font-medium text-right w-32">Amount</th>
              <th className="p-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fields.map((field, index) => {
              const qty = Number(rows[index]?.quantity) || 0;
              const rate = Number(rows[index]?.rate) || 0;

              return (
                <tr key={field.id} className="hover:bg-slate-50/60">
                  <td className="p-3">
                    <input
                      placeholder="Item name or service"
                      className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                      {...register(`items.${index}.itemName`, {
            required: "Item name is required",
          })}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                      {...register(`items.${index}.rate`, {
                        valueAsNumber: true,
                      })}
                    />
                  </td>
                  <td className="p-3 text-right font-medium text-slate-900">
                    {formatCurrency(qty * rate)}
                  </td>
                  <td className="p-3 text-center">
                    {fields.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <span className="text-slate-200 select-none">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}