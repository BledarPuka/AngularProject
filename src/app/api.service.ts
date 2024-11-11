import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { Product, ProductApi } from './product-interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  products = new BehaviorSubject<Product[]>([]);
  apiUrl = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) {}
  isLoading:boolean = false;
  searchPerformed:boolean = false;

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  populateSelectInput(): Observable<ProductApi> {
    return this.http.get<ProductApi>(`${this.apiUrl}`);
  }

  searchProduct(category: string): Observable<ProductApi> {
    this.searchPerformed=false;
    this.isLoading=true;
    return this.http
      .get<ProductApi>(`${this.apiUrl}/search?q=${category}`)
      .pipe(
        delay(300),
        tap((data) => {
          this.searchPerformed=true;
          this.isLoading=false;
          this.products.next(data.products);
        })
      );
  }

  filterProducts(
    skip: number | undefined,
    limit: number | undefined,
    select: string[]
  ): Observable<ProductApi> {
    this.searchPerformed=false;
    this.isLoading=true;
    return this.http
      .get<ProductApi>(
        `${this.apiUrl}?limit=${limit}&skip=${skip}&select=${select.join(',')}`
      )
      .pipe(
        delay(300),
        tap((data) => {
          this.searchPerformed=true;
          this.isLoading=false;
          this.products.next(data.products);
        })
      );
  }
}
