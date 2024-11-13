import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { Product, ProductApi } from './product-interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  products = new BehaviorSubject<Product[]>([]);
  apiUrl = 'https://dummyjson.com/products';
  isLoading: boolean = false;
  searchPerformed: boolean = false;

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  populateSelectInput(): Observable<ProductApi> {
    return this.http.get<ProductApi>(`${this.apiUrl}`);
  }

  searchProduct(category: string): Observable<ProductApi> {
    this.searchPerformed = false;
    this.isLoading = true;
    return this.http
      .get<ProductApi>(`${this.apiUrl}/search?q=${category}`)
      .pipe(
        tap((data) => {
          this.searchPerformed = true;
          this.isLoading = false;
          this.products.next(data.products);
        })
      );
  }

  filterProducts(
    skip: number | undefined,
    limit: number | undefined,
    select: string[]
  ): Observable<ProductApi> {
    this.searchPerformed = false;
    this.isLoading = true;
    return this.http
      .get<ProductApi>(
        `${this.apiUrl}?limit=${limit}&skip=${skip}&select=${select.join(',')}`
      )
      .pipe(
        tap((data) => {
          this.searchPerformed = true;
          this.isLoading = false;
          this.products.next(data.products);
        })
      );
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<ProductApi>(`${this.apiUrl}?limit=100`)
      .pipe(
        map((data) => [
          ...new Set(data.products.map((product) => product.category)),
        ])
      );
  }

  getTags(): Observable<string[]> {
    return this.http.get<ProductApi>(`${this.apiUrl}?limit=100`).pipe(
      map((data) => {
        const allTags = data.products.flatMap((product) => product.tags);
        return Array.from(new Set(allTags));
      })
    );
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(
      'https://dummyjson.com/products/add',
      product,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
