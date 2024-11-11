import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';

export const routes: Routes = [
    {
        path:'',redirectTo :'products', pathMatch: 'full'
    },
    {path:'',component: AppComponent},
    {path:'products',component: ProductsComponent},
    {path:'product/:id',component: ProductDetailsComponent},
    {path:'products/add',component: NewProductComponent},
    {
        path:'**',redirectTo :''
    }
];

