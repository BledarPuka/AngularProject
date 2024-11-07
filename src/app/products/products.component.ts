import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product-interface';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { map, Observable } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';
import { ChipModule } from 'primeng/chip';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ChipModule,
    TableModule,
    FilterComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private routes = inject(Router);
  private apiService = inject(ApiService);
  product$: Observable<Product[]> = this.apiService.products.pipe(
    map((list) =>
      list.map((product) => ({
        ...product,
        average: product.reviews.reduce((acc, curr) => {
          acc += curr.rating 
          return acc
        }, 0) / product.reviews.length,
      }))
    )
  );

  cols!: Column[];
  constructor() {}

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Title' },
      { field: 'category', header: 'Category' },
      { field: 'price', header: 'Price' },
      { field: 'tags', header: 'Tags' },
      { field: 'average', header: 'AvgReview' },
    ];
  }

  productById(id: number) {
    this.routes.navigate([`product/${id}`]);
  }
}
