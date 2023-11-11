export interface Cart {
  id: number;
  total_price: number;
  status: string;
  user_id?: number;
  cartItems: CartItem[];
  cart: Cart;
}

// CartItem.ts
import { Product } from "./Product";

export interface CartItem {
  id: number;
  quantity: number;
  user_id?: number;
  cart_id?: number;
  product_id: number;
  product: Product;
}
