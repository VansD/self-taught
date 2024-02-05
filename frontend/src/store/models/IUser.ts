import { RoleUser } from "../enums/RoleUser";

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: RoleUser;
  authToken: string | null;
}


export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IUserListRequest {
  page: number;
  pageLimit: number;
}

export interface IUserListResponse {
  rows: IUser[];
  count: number;
}

