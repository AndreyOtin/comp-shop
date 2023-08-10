export type UserAuthantication = {
  email: string;
  password: string;
};

export type UserLogin = UserAuthantication;

export type CheckedUser = {
  email: string;
  id: string;
};
