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
  Products = 'products',
  User = 'user'
}

export enum APIRoute {
  Login = 'users/signup',
  Register = 'users/signin',
  UserSignout = 'users/signout',
  CheckAuth = 'users/info',
  Products = '/products',
  Product = 'products/product',
  Range = 'products/range',
  Categories = 'products/categories',
  Types = 'products/types',
  Brands = 'products/brands'
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:category?/:type?',
  Product = '/catalog/:category?/product/:product',
  Register = '/register',
  Login = '/login',
  Profile = '/profile'
}

export enum MaxElementCount {
  HomePageProducts = 5,
  BrandsFilter = 6
}

export enum CatalogCardVariant {
  Extra = 'extra',
  Primary = 'primary'
}

export enum SearchParams {
  Page = 'page',
  Layout = 'layout',
  Sort = 'sort',
  ShowCount = 'show-count',
  Brand = 'brand',
  Category = 'category',
  Type = 'type',
  Color = 'color',
  Range = 'range',
  ProductNav = 'product-nav'
}

export enum CatalogUrlParam {
  CustomBuilds = 'Custom-Builds',
  NewProducts = 'New-Products',
  Laptops = 'Laptops',
  Desctops = 'Desktop-PCs'
}

export enum DefaultValue {
  Page = 1,
  ShowCount = 10,
  Sort = 'price'
}

export enum SortType {
  Price = 'price',
  Stock = 'stock'
}
