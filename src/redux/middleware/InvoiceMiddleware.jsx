const STORAGE_KEY = "invoices";
export const invoiceMiddleware = (store) => (next) => (action) => {
  if (!action.type?.startsWith("invoices/")) {
    return next(action);
  }
  const start = performance.now();
  console.group(`Redux → ${action.type}`);
  console.log("Previous State:", store.getState().invoices);
  console.log("Payload:", action.payload);
  const result = next(action);
  const state = store.getState().invoices;
  if (action.type === "invoices/saveInvoiceSuccess") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.invoices));
  }
  if (action.type === "invoices/fetchInvoiceSuccess") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.invoices));
  }
  console.log("Updated State:", state);
  console.log("Execution Time:", `${(performance.now() - start).toFixed(2)}ms`);
  console.groupEnd();
  return result;
};