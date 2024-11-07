export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  tags: any[];
  reviews: {
    rating: number
  }[];
  average:number
}

export interface ProductApi {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
