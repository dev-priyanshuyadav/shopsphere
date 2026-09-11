export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  tags?: string[];
  featured?: boolean;
}

export type ProductCategory =
  | "electronics"
  | "clothing"
  | "accessories"
  | "home"
  | "beauty";
