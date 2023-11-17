import { Cart } from "./Cart";
import { DeliveryItem } from "./Delivery";

export interface Order {
  id: number;
  status: string;
  user_id?: number;
  cart_id?: number;
  orderItems: OrderItem[];
  order: Order;
  data: Order;
}

// OrderItem.ts
export interface OrderItem {
  id: number;
  isPaid: boolean;
  user_id?: number;
  cart_id?: number;
  cart: Cart;
  order_number: string;
  status: boolean;
  total_price: number;
  delivery_item: DeliveryItem;
  deliveryItem_id?: number;
  product_id: number;
  created_at: Date;
}
