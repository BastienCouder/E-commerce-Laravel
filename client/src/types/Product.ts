export interface Product {
    id: number;
    name: string;
    price: number;
    shortDescription: string;
    longDescription: string;
    stock: number;
    sizes?: string[];
}
