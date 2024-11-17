import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-interface';
import { Subscription, take } from 'rxjs';

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
export class NewProductComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  productId: any;
  categoryOptions: { name: string; value: string }[] = [];
  productTags: string[] = [];
  filteredTags: string[] = [];
  private editSubscription: Subscription | null = null;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    category: new FormControl<string[] | null>(null, Validators.required),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    discount: new FormControl<number | null>(null, Validators.required),
    stock: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    tags: new FormControl<string[] | null>(null, Validators.required),
    sku: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^[A-Z0-9_]+$/),
    ]),
  });

  ngOnInit(): void {
    this.apiService
      .getCategories()
      .pipe(take(1))
      .subscribe((categories) => {
        this.categoryOptions = categories.map((category) => ({
          name: category
            .replace(/-/, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          value: category,
        }));
      });

    this.apiService
      .getTags()
      .pipe(take(1))
      .subscribe((tags) => {
        this.productTags = tags;
      });

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.apiService.getProductById(this.productId).subscribe((product) => {
        this.populateForm(product);
      });
    }
  }

  ngOnDestroy(): void {
    this.editSubscription?.unsubscribe();
    console.log('Unsubscribed from UPDATE');
  }

  populateForm(product: Product) {
    this.formGroup.patchValue({
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
    if (this.formGroup.invalid) {
      console.error('Form is invvalid');
      return;
    }
    const productData = this.formGroup.value;
    this.apiService.createProduct(productData).subscribe((response) => {
      console.log(response);
    });
    this.router.navigate(['/products']);
  }

  editProduct() {
    if (this.formGroup.invalid) {
      console.error('Form is invvalid');
      return;
    }
    const updatedProduct: Partial<Product> = this.formGroup.value;
    this.apiService
      .updateProduct(this.productId, updatedProduct)
      .subscribe((response) => {
        console.log('Product updated:', response);
        this.router.navigate(['/products']);
      });
  }

  deleteProduct(id: number) {
    this.apiService.delete(id).subscribe(() => {
      console.log(`Product with ID ${id} deleted.`);
      this.router.navigate(['/products']);
    });
  }
}
