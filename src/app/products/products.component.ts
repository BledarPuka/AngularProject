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
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { EmmptyStateComponent } from '../emmpty-state/emmpty-state.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    ProgressSpinnerModule,
    CommonModule,
    ChipModule,
    TableModule,
    FilterComponent,
    ImageModule,
    RatingModule,
    FormsModule,
    EmmptyStateComponent,
    ButtonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private routes = inject(Router);
  protected apiService = inject(ApiService);
  hasResults: boolean = true;

  product$: Observable<Product[]> = this.apiService.products.pipe(
    map((list) =>
      list.map((product) => ({
        ...product,
        average:
          product.reviews?.reduce((acc, curr) => {
            acc += curr.rating;
            return acc;
          }, 0) / product.reviews?.length,
      }))
    )
  );

  cols: Column[] = [
    { field: 'id', header: 'Id' },
    { field: 'title', header: 'Title' },
    { field: 'category', header: 'Category' },
    { field: 'price', header: 'Price' },
    { field: 'tags', header: 'Tags' },
    { field: 'reviews', header: 'AvgReview' },
  ];
  constructor() {}

  ngOnInit(): void {

    this.product$.subscribe((products) => {
      this.hasResults = products.length > 0;
    });
  }

  onFilterChange(colums: string[]) {

    colums.forEach((col) => {
      if (this.cols.every((colums) => colums.field !== col)) {
        this.cols.push({ field: col, header: col });
      }
    });

    this.cols = this.cols.filter((colum) => colums.includes(colum.field));
    console.log(colums);
  }

  newProduct(){
    
    this.routes.navigate(['products/add']);
  }
  productById(id: number) {
    this.routes.navigate([`product/${id}`]);
  }

}
