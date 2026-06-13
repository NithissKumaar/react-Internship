import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import InvoiceHeader from "../../components/hookForm/invoice/InvoiceHeader";
import InvoiceItems from "../../components/hookForm/invoice/InvoiceItems";
import InvoiceSummary from "../../components/hookForm/invoice/InvoiceSummary";
import useInvoice from "../../components/hookForm/invoice/useInvoice";
import { calculateInvoice } from "../../utils/invoiceCalculation";

const defaultValues = {
  customerName: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  items: [{ itemName: "", quantity: 1, rate: 0 }],
};

export default function InvoicePage() {
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { save, loading } = useInvoice();
  const { handleSubmit, watch, reset } = methods;

  const items = watch("items") || [];
  const { subtotal, gst, grandTotal } = calculateInvoice(items);

  const submit = (data) => {
    const invoice = {
      ...data,
      subtotal,
      gst,
      grandTotal,
      createdAt: new Date().toISOString(),
    };

    save(invoice);
    reset(defaultValues);
    navigate("/invoices");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/invoices")}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium mb-4 transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Invoices
        </button>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5">
                <FileText size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Invoice Builder
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Create a new customer invoice
                </p>
              </div>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(submit)}>
                <InvoiceHeader />
                <InvoiceItems />
                <InvoiceSummary />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-8 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                    loading
                      ? "bg-slate-300 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading ? "Saving Invoice..." : "Save Invoice"}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}