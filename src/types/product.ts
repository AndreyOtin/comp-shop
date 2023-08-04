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
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Categories {
  id: number;
  name: string;
  types: Type[];
  products: Product[];
}

export interface Types {
  id: number;
  name: string;
  products: Product[];
}

export interface ProductsQuery {
  limit?: number;
  offset?: number;
  priceSort?: 'asc' | 'desc';
  category?: string[];
  type?: string[];
  color?: string[];
  price?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isCustom?: boolean;
  brand?: string[];
}

export interface Brand {
  id: number;
  name: string;
  image: string;
}

export interface Range {
  totalMin: number;
  totalMax: number;
  rangedProducts: {
    range: Product[];
  };
}
