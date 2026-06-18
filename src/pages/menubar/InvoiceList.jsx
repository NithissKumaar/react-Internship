import { useNavigate } from "react-router-dom";
import { Plus, Receipt, ArrowRight, Calendar } from "lucide-react";
import useInvoice from "../../components/hookForm/invoice/useInvoice";
import { formatCurrency } from "../../utils/invoiceCalculation";

export default function InvoiceList() {
  const navigate = useNavigate();
  const { invoices = [] } = useInvoice();

  return (
    <div className="min-h-screen  p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">
            {invoices.length} {invoices.length === 1 ? "invoice" : "invoices"}{" "}
            created
          </p>
        </div>

        <button
          onClick={() => navigate("/invoices/create")}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          Create Invoice
        </button>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 flex flex-col items-center text-center">
          <div className="bg-blue-50 text-blue-600 rounded-full p-4 mb-4">
            <Receipt size={28} />
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            No invoices yet
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Create your first invoice to get started.
          </p>
          <button
            onClick={() => navigate("/invoices/create")}
            className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus size={16} />
            Create Invoice
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-w-3xl">
          {invoices
            .slice()
            .reverse()
            .map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => navigate(`/invoice-preview/${invoice.id}`)}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-blue-200 hover:shadow-md transition "
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5">
                    <Receipt size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      {invoice.customerName || "Unnamed Customer"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Calendar size={12} />
                      {invoice.invoiceDate}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-semibold text-slate-900">
                    {formatCurrency(invoice.grandTotal)}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-blue-600 text-xs font-medium mt-1">
                    View invoice
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}