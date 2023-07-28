export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success'
}

export enum UserStatus {
  Unknown = 'unknown',
  Auth = 'auth',
  NoAuth = 'noauth'
}

export enum SliceNameSpace {
  App = 'app',
  User = 'user'
}

export enum APIRoute {
  Login = '/user/login',
  Register = '/user/register',
  CheckAuth = '/user/info',
  UploadAvatar = '/user/upload'
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:type?',
  Register = '/register',
  Login = '/login',
  Profile = '/profile'
}

export enum MaxElementCount {
  CatalogCard = 7
}

export enum CatalogCardVariant {
  Extra = 'extra',
  Primary = 'primary'
}
