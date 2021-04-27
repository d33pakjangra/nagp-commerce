import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  onCartItemCountChange = new BehaviorSubject<number>(0);

  constructor(private readonly cartService: CartService) {
    this.watchCartItemCount();
  }

  watchCartItemCount() {
    this.cartService.onCartUpdate.subscribe((isCartUpdated: boolean) => {
      if (isCartUpdated) {
        this.cartService.getAllProductFromCart().subscribe((cartItems) => {
          this.onCartItemCountChange.next(cartItems.length);
        });
      }
    });
  }
}
