import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, InputTextModule,ButtonModule,AutoCompleteModule,DropdownModule, InputTextareaModule,FloatLabelModule,InputNumberModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent {

  categoryOptions=[]

  productTags=[]

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

  search() {

  }
}
