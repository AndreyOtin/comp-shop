import { Product } from './product';

export type PurchasedProducts = Cart['cart']['items'][0][];

export interface Cart {
  email: string;
  token: string;
  secret: string;
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
