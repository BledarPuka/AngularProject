import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Column {
  field: string;
  header: string;
}

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
  @Input() preSelectedFilters: Column[] = [];
  @Output() filterChange = new EventEmitter<string[]>();

  filterForm: FormGroup = new FormGroup({
    skip: new FormControl<number | null>(0, Validators.required),
    limit: new FormControl<number | null>(10, Validators.required),
    filter: new FormControl<string[] | null>(null, Validators.required),
  });

  filterKey: { prop: string }[] = [];

  ngOnInit(): void {
    this.apiService.populateSelectInput().subscribe((data) => {
      this.filterKey = Object.keys(data.products[0]).map((key) => ({
        prop: key,
        disabled: !!this.preSelectedFilters.find((item) => item.field === key),
      }));
    });

    this.filterForm
      .get('filter')
      ?.setValue(this.preSelectedFilters.map((col) => col.field));
    // this.filterForm.get('filter')?.valueChanges.subscribe((data) => this.filterChange.emit(data));
  }

  onFilter() {
    let filterControls = {
      skip: this.filterForm.controls['skip'].value,
      limit: this.filterForm.controls['limit'].value,
      filter: this.filterForm.controls['filter'].value,
    };
    this.apiService
      .filterProducts(
        filterControls.skip,
        filterControls.limit,
        filterControls.filter
      )
      .subscribe(() => {
        this.filterChange.emit(filterControls.filter);
      });
  }
}
