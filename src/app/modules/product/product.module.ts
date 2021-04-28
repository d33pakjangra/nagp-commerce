import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';

@NgModule({
  declarations: [ProductComponent, ProductsComponent, ProductDetailsComponent, ProductCategoriesComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
