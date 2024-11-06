import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product, ProductApi } from './product-interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  products = new BehaviorSubject<Product[]>([]);
  apiUrl = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  populateSelectInput():Observable<ProductApi>{
    return this.http.get<ProductApi>(`${this.apiUrl}`);
    }

  searchProduct(category: string): Observable<ProductApi> {
    return this.http
      .get<ProductApi>(`${this.apiUrl}/search?q=${category}`)
      .pipe(
        tap((data) => {
          this.products.next(data.products);
        })
      );
  }

  filterProducts(
    skip: number,
    limit: number,
    select: []
  ): Observable<ProductApi> {
    return this.http
      .get<ProductApi>(
        `${this.apiUrl}?limit=${limit}&skip=${skip}&select=${select.join(',')}`
      )
      .pipe(
        tap((data) => {
          this.products.next(data.products);
        })
      );
  }
}
