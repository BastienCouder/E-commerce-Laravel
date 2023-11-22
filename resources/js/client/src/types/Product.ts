export interface Product {
  id: number;
  name: string;
  image: string;
  image_mime: string;
  price: number;
  value?: boolean | number;
  category: Category | undefined;
  shortDescription: string;
  longDescription: string;
  stock: number;
  created_at: Date;
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

export type EditedFields = {
  [key: number]: Partial<any>;
};
