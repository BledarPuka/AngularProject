import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { max } from 'rxjs';

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

  formGroup: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    category: new FormControl<string[] | null>(null),
    price: new FormControl<number | null>(null),
    discount: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null,Validators.max(100)),
    tags: new FormControl<string[] | null>(null),
    sku: new FormControl<string | null>(null, Validators.pattern(/^[A-Z0-9_]+$/) ),
  });
  productId:string|null=null

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

     this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.apiService.getProductById(Number(this.productId)).subscribe((product) => {
        this.populateForm(product);
      });
    }
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
    const productData = this.formGroup.value;
    this.apiService.createProduct(productData).subscribe(
      (response)=>{
        console.log(response);
        
      }
    );
    this.formGroup.reset()
  }

  editProduct(){

  }
}

