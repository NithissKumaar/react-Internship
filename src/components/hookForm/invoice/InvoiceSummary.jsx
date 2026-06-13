import { useFormContext } from "react-hook-form";
import { formatCurrency, calculateInvoice } from "../../../utils/invoiceCalculation";

export default function InvoiceSummary() {
  const { watch } = useFormContext();

  const items = watch("items") || [];
  const { subtotal, gst, grandTotal } = calculateInvoice(items);

  return (
    <div className="mt-8 flex justify-end">
      <div className="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-slate-600">
          <span>GST (3%)</span>
          <span className="font-medium text-slate-900">
            {formatCurrency(gst)}
          </span>
        </div>

        <hr className="border-slate-200" />

        <div className="flex justify-between text-lg font-semibold text-slate-900">
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}