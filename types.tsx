export interface AuthFormDataTypes {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}

export interface InputErrors {
  name: string;
  email: string;
  password: string;
  global: string;
  [key: string]: string;
}
export interface User {
  name: string;
  email: string;
  token?: string;
  id: string;
  image?: string;
}
export interface Chat {
  name: string;
  usersIds: string[];
  id: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
}
export interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface ApiOptions {
  method: string;
  headers?: {
    [key: string]: string;
  };
  body?:
    | {
        [key: string]: string;
      }
    | object;
}
