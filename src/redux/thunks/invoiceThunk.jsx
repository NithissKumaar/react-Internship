import { saveInvoiceStart, saveInvoiceSuccess, saveInvoiceFailure, fetchInvoicesStart, fetchInvoicesSuccess } from "../reducer/invoiceReducer";
const STORAGE_KEY = "invoices";
export const fetchInvoices = () => (dispatch) => {
  dispatch(fetchInvoicesStart());
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  dispatch(fetchInvoicesSuccess(stored));
};
export const saveInvoice = (data) => async (dispatch) => {
  dispatch(saveInvoiceStart());
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newInvoice = {
      id: Date.now(),
      ...data,
    };
    dispatch(saveInvoiceSuccess(newInvoice));
  } catch (err) {
    dispatch(saveInvoiceFailure(err.message || "Failed to save invoice"));
  }
};