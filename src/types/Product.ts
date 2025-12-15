export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'instruments' | 'studio-gear' | 'accessories' | 'vinyl';
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}
