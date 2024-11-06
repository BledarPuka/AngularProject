export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  tags: [];
  rating: number;
}

export interface ProductApi {
  map(arg0: (data: { products: {}[]; }) => { prop: string; }[]): unknown;
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
