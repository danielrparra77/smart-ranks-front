import { StatusEnum } from '../../src/app/enum/status.enum';
import { IProduct } from '../../src/app/interfaces/product.entity';

export const mockProduct: IProduct = {
    id: 'a9ed4a65-67bf-476e-91a5-a3a68f7fca3d',
    name: 'fish',
    description: 'exotic fish',
    price: 50000,
    stock: 10,
    status: StatusEnum.active
};