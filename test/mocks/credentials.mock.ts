import { RoleEnum } from '../../src/app/enum/role.enum';
import { ICredentials, ISignInCredentials } from '../../src/app/interfaces/credentials.interface';

export const mockSignInCredentials: ISignInCredentials = {
  email: 'correo@correo.com',
  password: 'contrasena',
};

export const mockCredential: ICredentials = {
  access_token: 'token 123sdfsdkj',
  role: RoleEnum.administrator,
};
