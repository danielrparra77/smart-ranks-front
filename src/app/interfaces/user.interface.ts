import { RoleEnum } from '../enum/role.enum';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  role: RoleEnum;  
}

export interface IUserUpsert extends IUser {
  new: boolean;
}