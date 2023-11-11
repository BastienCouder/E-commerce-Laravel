export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Auth {
  name?: string;
  email: string;
  password: string;
}
