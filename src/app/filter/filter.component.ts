import { Component, inject, OnInit } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [InputNumberModule, MultiSelectModule, ButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  apiService = inject(ApiService);

formgroup: FormGroup = new FormGroup({
  filter: new FormControl(),
  skip: new FormControl(),
  limit: new FormControl()
}) 
  
  filter: { prop: string }[] = [];


  ngOnInit(): void {
    this.apiService.populateSelectInput().subscribe((data) => {
      this.filter = Object.keys(data.products[0]).map((key) => ({
        prop: key,
      }));
    });
  }
}
