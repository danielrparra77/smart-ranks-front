export interface IInvoice {
  id?: string;
  user_id: string;
  products: string[];
  total: number;
  date: Date;
}

export interface IInvoiceView {
  invoiceData?: IInvoice,
  id?: string,
}