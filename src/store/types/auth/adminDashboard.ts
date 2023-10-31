export type Customer = {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
};
export type Product = {
  _id: string;
  name: string;
  price: string;
  description: string;
};
export interface AdminDashboardState {
  customers: Customer[] | [];
  products: Product[] | [];
  loading: boolean;
  error: string | null;
}
