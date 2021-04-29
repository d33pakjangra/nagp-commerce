import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [OrdersComponent, OrderComponent],
  imports: [CommonModule, OrderRoutingModule],
})
export class OrderModule {}
