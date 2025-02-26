import { RoleEnum } from '../enum/role.enum';

export interface ISignInCredentials {
  email: string,
  password: string,
}

export interface ICredentials {
  access_token: string;
  role: RoleEnum;
}