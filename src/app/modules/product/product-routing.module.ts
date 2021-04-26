import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
