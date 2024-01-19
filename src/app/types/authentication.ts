export interface authData {
  token: string;
  user: User;
}

export interface User {
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: string | number | boolean | any;
}

export type UserType = "admin" | "client";
