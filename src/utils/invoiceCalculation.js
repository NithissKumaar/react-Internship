export const calculateInvoice = (items = []) => {
  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item?.quantity) || 0;
    const rate = Number(item?.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const gst = subtotal * 0.03;
  const grandTotal = subtotal + gst;

  return {
    subtotal,
    gst,
    grandTotal,
  };
};

export const formatCurrency = (value = 0) =>
  `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;