import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, InputTextModule,FloatLabelModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
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
}
