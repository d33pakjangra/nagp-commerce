import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/core/models/cart-item';
import { CartService } from 'src/app/core/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemsResolver implements Resolve<CartItem[]> {
  constructor(private cartService: CartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CartItem[]> {
    return this.cartService.getAllProductFromCart();
  }
}
