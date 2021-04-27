import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { EntityTypes } from '../constants';
import { CartItem } from '../models/cart-item';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  onCartUpdate = new BehaviorSubject<boolean>(true); // true for loading existing cart item count on app load

  constructor(private readonly indexedDbService: IndexedDbService) {}

  addProductToCart(cartItem: CartItem): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.getProductFromCartById(cartItem.id).subscribe((product) => {
        if (product) {
          cartItem.quantity = product.quantity + 1;
        }
        this.indexedDbService
          .addUpdateItems<CartItem>(EntityTypes.cartItems, [cartItem])
          .subscribe(
            (success) => {
              this.onCartUpdate.next(success);
              observer.next(success);
            },
            (error) => {
              observer.error(error);
            }
          );
      });
    });
  }

  getProductFromCartById(id: string): Observable<CartItem> {
    return new Observable((observer: Observer<CartItem>) => {
      this.indexedDbService.getById<CartItem>(EntityTypes.cartItems, id).subscribe(
        (cartItem) => {
          observer.next(cartItem);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getAllProductFromCart(): Observable<CartItem[]> {
    return new Observable((observer: Observer<CartItem[]>) => {
      this.indexedDbService.getAll<CartItem>(EntityTypes.cartItems).subscribe(
        (cartItems) => {
          observer.next(cartItems);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
