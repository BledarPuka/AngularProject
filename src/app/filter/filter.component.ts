import { Component, inject, OnInit } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    MultiSelectModule,
    ButtonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  apiService = inject(ApiService);

  filterForm: FormGroup = new FormGroup({
    skip: new FormControl<number | null>(null,Validators.required),
    limit: new FormControl<number | null>(null,Validators.required),
    filter: new FormControl<string[] | null>(null,Validators.required),
  });

  filterKey: { prop: string }[] = [];

  ngOnInit(): void {
    this.apiService.populateSelectInput().subscribe((data) => {
      this.filterKey = Object.keys(data.products[0]).map((key) => ({
        prop: key,
      }));
    });
    // this.filterForm.valueChanges.subscribe((data) => console.log(data));
  }

  onFilter(){
    let filterControls={
      skip: this.filterForm.controls['skip'].value,
      limit: this.filterForm.controls['limit'].value,
      filter: this.filterForm.controls['filter'].value
    }
    this.apiService.filterProducts(filterControls.skip,filterControls.limit,filterControls.filter).subscribe()
  }
}
