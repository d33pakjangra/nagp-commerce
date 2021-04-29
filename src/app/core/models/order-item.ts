export interface OrderItem {
  id: string;
  category: string;
  name: string;
  description: string;
  imageUrl: string;
  brand: string;
  color: string;
  price: number;
  rating: number;
  seller: string;
  quantity: number;
  expectedDelivery: string;
  isDelivered: boolean;
}
