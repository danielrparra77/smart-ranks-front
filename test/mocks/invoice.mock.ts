import { IInvoice } from '../../src/app/interfaces/invoice.interface';
import { mockProduct } from './product.mock';
import { mockUser } from './user.mock';

export const mockInvoice: IInvoice = {
    user_id: mockUser.id,
    products: [mockProduct.id],
    total: 10,
    date: new Date(),
};