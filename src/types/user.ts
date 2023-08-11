import { Cart } from './cart';

export type UserAuthantication = {
  email: string;
  password: string;
};

export type UserLogin = UserAuthantication;

export type CheckedUser = Cart;
