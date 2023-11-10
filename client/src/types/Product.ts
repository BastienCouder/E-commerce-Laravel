export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  shortDescription: string;
  longDescription: string;
  stock: number;
  sizes?: Size[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}
