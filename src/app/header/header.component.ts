import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  protected router = inject(Router);

  productId: string | null = null;

  private routerSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        const idMatch = currentUrl.match(/product\/(\d+)/);
        this.productId = idMatch ? idMatch[1] : null;
      });
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      console.log('Unsubscribed');
    }
  }

  onSearch(category: string) {
    this.apiService.searchProduct(category).subscribe();
    console.log(category);
  }
}
