import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-interface';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextareaModule,
    FloatLabelModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  categoryOptions: { name: string; value: string }[] = [];

  productTags: string[] = [];
  filteredTags: string[] = [];

  newProduct: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    category: new FormControl<string[] | null>(null),
    price: new FormControl<number | null>(null),
    discount: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    tags: new FormControl<string[] | null>(null),
    sku: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.apiService.getCategories().subscribe((categories) => {
      this.categoryOptions = categories.map((category) => ({
        name: category
          .replace(/-/, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        value: category,
      }));
    });

    this.apiService.getTags().subscribe((tags) => {
      this.productTags = tags;
    });

    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      // Fetch the product by ID
      this.apiService.getProductById(Number(productId)).subscribe((product) => {
        this.populateForm(product);
      });
    }
  }
  populateForm(product: Product) {
    this.newProduct.patchValue({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discount: product.discountPercentage,
      stock: product.stock,
      tags: product.tags,
      sku: product.sku,
    });
  }

  searchTags(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTags = this.productTags.filter((tag) =>
      tag.toLowerCase().includes(query)
    );
  }

  submitProduct() {
    const productData = this.newProduct.value;
    this.apiService.createProduct(productData).subscribe();
  }
}
function populateForm(product: any, Product: any) {
  throw new Error('Function not implemented.');
}
