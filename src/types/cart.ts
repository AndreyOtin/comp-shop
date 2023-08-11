import { Product } from './product';

export interface Cart {
  email: string;
  cart: {
    items: Item[];
  };
}

export interface Item {
  transactionId: number;
  count: number;
  totalSum: number;
  product: Product;
}
