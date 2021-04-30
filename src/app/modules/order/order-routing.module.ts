import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersResolver } from './components/resolvers/orders.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    resolve: {
      orders: OrdersResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
