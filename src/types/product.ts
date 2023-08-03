export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  color: string;
  price: number;
  newPrice?: number;
  image: string;
  imageLarge: string;
  inStock: boolean;
  isNew: boolean;
  isCustom: boolean;
  category: Category;
  type: Type;
}

export interface Category {
  name: string;
}

export interface Type {
  name: string;
}

export interface ProductsQuery {
  limit?: number;
  offset?: number;
  priceSort?: 'asc' | 'desc';
  category?: number;
  inStock?: boolean;
  isNew?: boolean;
  isCustom?: boolean;
}
