import { IProduct } from "./product.entity";

export interface IProductToCart {
  product: IProduct,
  number: number,
}

export interface ICart {
  products: IProductToCart[],
}