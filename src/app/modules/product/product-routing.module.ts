import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductsResolver } from './resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: {
      products: ProductsResolver,
    },
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
