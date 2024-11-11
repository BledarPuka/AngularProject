import { Component, inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import { filter, Observable } from 'rxjs';
import { Product } from '../product-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ ButtonModule,IconFieldModule,InputIconModule,InputTextModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
apiService= inject(ApiService)
activatedRoute= inject(ActivatedRoute)

onSearch(category:string){
  this.apiService.searchProduct(category).subscribe()
  console.log(category)
}

}
