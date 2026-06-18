import { useDispatch, useSelector } from "react-redux";
import { saveInvoice } from "../../../redux/thunks/invoiceThunk";

export default function useInvoice() {
  const dispatch = useDispatch();
  
  const invoiceState = useSelector((state) => state.invoices);

  const save = (data) => {
    dispatch(saveInvoice(data));
  };

  return {
    invoices: invoiceState?.invoices || [],
    loading: invoiceState?.loading || false,
    error: invoiceState?.error || null,
    save,
  };
}