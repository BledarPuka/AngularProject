import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-interface';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { map, Observable, BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private apiService = inject(ApiService);
  private activatedRoute = inject(ActivatedRoute);

  isLoading$ = new BehaviorSubject<boolean>(true);
  product$: Observable<Product> = this.apiService
    .getProductById(this.activatedRoute.snapshot.params['id'])
    .pipe(
      map((data) => {
        this.isLoading$.next(false);
        return data;
      })
    );

  ngOnInit(): void {}
}
