export interface User {
  _id: string;
  email: string;
  name: string;
  __v?: number;
  isEmailVerified: boolean;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  admin: User | null;
  loading: boolean;
  error: string | null;
}
