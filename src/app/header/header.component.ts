import { Component, inject, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  protected router = inject(Router);

  productId: string| undefined;

  ngOnInit(): void {
     this.route.params.subscribe((params: Params)=>{
      this.productId = params['id'];
    });
    console.log(this.productId);
    
   
  }

  onSearch(category: string) {
    this.apiService.searchProduct(category).subscribe();
    console.log(category);
  }
}
