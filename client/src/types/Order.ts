export interface Order {
  id: number;
  status: string;
  user_id?: number;
  cart_id?: number;
  orderItems: OrderItem[];
  order: Order;
}

// OrderItem.ts
export interface OrderItem {
  id: number;
  isPaid: boolean;
  user_id?: number;
  cart_id?: number;
  deliveryItem_id?: number;
  product_id: number;
}
