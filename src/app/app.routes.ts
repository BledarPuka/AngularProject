import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  { path: '', component: AppComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/add', component: NewProductComponent },
  { path: 'product/:id', component: NewProductComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
