import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriceDetailsComponent } from './components/price-details/price-details.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [CartComponent, PriceDetailsComponent, CartItemComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
