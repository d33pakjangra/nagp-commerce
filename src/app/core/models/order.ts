import { OrderItem } from './order-item';

export interface Order {
  id: string;
  orderItems: OrderItem[];
  orderedOn: string;
}
