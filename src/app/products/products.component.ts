import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product-interface';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {  Observable } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ChipModule ,TableModule,FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
 private routes = inject(Router);
 private apiService = inject(ApiService);
  product$: Observable<Product[]> = this.apiService.products

  constructor() {}

  ngOnInit(): void {}

  productById(id: number) {
    this.routes.navigate([`product/${id}`]);
  }
}
