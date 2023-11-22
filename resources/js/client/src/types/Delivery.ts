// Delivery.ts
export interface Delivery {
  id: number;
  user_id?: number;
  deliveryItems: DeliveryItem[];
}

// DeliveryItem.ts
export interface DeliveryItem {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address_1: string;
  address_2: string;
  zipcode: string;
  country: string;
  city: string;
  created_by: number;
  updated_by: number;
  Default: boolean;
  user_id?: number;
  delivery_id?: number;
  delivery: Delivery;
}
