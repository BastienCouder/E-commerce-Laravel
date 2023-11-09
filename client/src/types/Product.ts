export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  shortDescription: string;
  longDescription: string;
  stock: number;
  sizes?: string[];
}

export interface Category {
  id: number;
  name: string;
}
