import { ICart } from '../../src/app/interfaces/cart.interface';
import { mockProduct } from './product.mock';

export const mockCart: ICart = {
    products: [{
      product: mockProduct,
      number: 1,
    }],
};