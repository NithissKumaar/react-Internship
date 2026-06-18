import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, FileText } from "lucide-react";
import useInvoice from "../../components/hookForm/invoice/useInvoice";
import { formatCurrency } from "../../utils/invoiceCalculation";

export default function InvoicePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices } = useInvoice();

  const invoice = invoices.find((i) => String(i.id) === String(id));
  const handlePrint = () => {
    const printContents = document.getElementById("print-area")?.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${invoice?.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #333; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
            .flex { display: flex; justify-content: space-between; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .font-semibold { font-weight: bold; }
            .space-y-2 > * + * { margin-top: 8px; }
            hr { border: 0; border-top: 1px solid #ddd; margin: 10px 0; }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; color: #000; text-transform: uppercase;">Making Minds</h1>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 100);
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 text-center px-4">
        <div className="bg-slate-100 text-slate-400 rounded-full p-4">
          <FileText size={28} />
        </div>
        <h2 className="text-base font-semibold text-slate-900">Invoice not found</h2>
        <button
          onClick={() => navigate("/invoices")}
          className="mt-2 inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:underline cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Invoices
        </button>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-10">
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <button
          onClick={() => navigate("/invoices")}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium transition cursor-pointer self-start"
        >
          <ArrowLeft size={16} /> Back to Invoices
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer w-full sm:w-auto"
        >
          <Printer size={16} /> Print Invoice
        </button>
      </div>
      <div id="print-area" className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Invoice</h1>
            <p className="text-sm text-slate-500 mt-1">#{invoice.id}</p>
          </div>
          <div className="sm:text-right text-sm">
            <p className="text-slate-500">Invoice Date</p>
            <p className="font-medium text-slate-900">{invoice.invoiceDate}</p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Billed to</p>
          <p className="text-base font-semibold text-slate-900">
            {invoice.customerName || "Unnamed Customer"}
          </p>
        </div>
        <div className="border border-slate-200 rounded-xl overflow-x-auto mb-8">
          <table className="w-full text-left text-sm min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                <th className="p-3 font-medium">Item</th>
                <th className="p-3 font-medium text-center w-20">Qty</th>
                <th className="p-3 font-medium text-right w-28">Rate</th>
                <th className="p-3 font-medium text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td className="p-3 text-slate-900 break-words">{item.itemName}</td>
                  <td className="p-3 text-center text-slate-600">{item.quantity}</td>
                  <td className="p-3 text-right text-slate-600">{formatCurrency(item.rate)}</td>
                  <td className="p-3 text-right font-medium text-slate-900">
                    {formatCurrency((Number(item.quantity) || 0) * (Number(item.rate) || 0))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <div className="w-full sm:w-72 space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>GST (3%)</span>
              <span className="font-medium text-slate-900">{formatCurrency(invoice.gst)}</span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex justify-between text-lg font-semibold text-slate-900 pt-1">
              <span>Grand Total</span>
              <span>{formatCurrency(invoice.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}