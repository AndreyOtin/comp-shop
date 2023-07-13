export type UserAuthantication = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type UserLogin = Omit<UserAuthantication, 'name | username'>;

export type CheckedUser = {
  email: string;
  token: string;
  name: string;
  username: string;
  img?: string;
};
