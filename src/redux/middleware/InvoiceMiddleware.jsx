export const invoiceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("invoices/")) {
    try {
      const invoiceState = store.getState().invoices.invoices;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceState));
    } catch (error) {
      console.error(error);
    }
  }
  return result;
};