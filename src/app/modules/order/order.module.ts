import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderItemComponent } from './components/order-item/order-item.component';

@NgModule({
  declarations: [OrdersComponent, OrderComponent, OrderItemComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
