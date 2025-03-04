import { RoleEnum } from '../../src/app/enum/role.enum';
import { IUser } from '../../src/app/interfaces/user.interface';

export const mockUser: IUser = {
    id: '114ecd3d-1b13-4f86-a421-1365d7f0af02',
    name: 'usuario',
    email: 'correo@correo.com',
    password: undefined,
    role: RoleEnum.administrator
};
