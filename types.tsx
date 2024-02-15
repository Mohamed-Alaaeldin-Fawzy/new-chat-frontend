export interface AuthFormDataTypes {
  name: string;
  email: string;
  password: string;
  [key: string]: string; // Index signature
}

export interface User {
  name: string;
  email: string;
  token?: string;
  id?: string;
}
export interface Chat {
  name: string;
  usersIds: string[];
  id: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
