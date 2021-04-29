import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/shared/guards/unsaved-changes.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartItemsResolver } from './resolvers/cart-items.resolver';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    resolve: {
      cartItems: CartItemsResolver,
    },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canDeactivate: [UnsavedChangesGuard],
    resolve: {
      cartItems: CartItemsResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
