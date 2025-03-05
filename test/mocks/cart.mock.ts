import { ICart, IProductToCart } from '../../src/app/interfaces/cart.interface';
import { mockProduct } from './product.mock';

export const mockProductToCart: IProductToCart = {
  product: mockProduct,
  number: 1,
};

export const mockCart: ICart = {
    products: [mockProductToCart],
};