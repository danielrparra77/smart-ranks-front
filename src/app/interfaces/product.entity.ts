import { StatusEnum } from '../enum/status.enum';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: StatusEnum;  
}

export interface IProductUpsert extends IProduct {
  new: boolean;
}