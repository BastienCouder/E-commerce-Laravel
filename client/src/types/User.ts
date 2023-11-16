export interface User {
  id: number;
  name: string;
  email: string;
  account: string;
}

export interface Auth {
  name?: string;
  email: string;
}
