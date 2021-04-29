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
      this.indexedDbService
        .addUpdateItems<CartItem>(EntityTypes.cartItems, [cartItem])
        .subscribe(
          (success) => {
            this.onCartUpdate.next(success);
            observer.next(success);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  getProductFromCartById(id: string): Observable<CartItem> {
    return new Observable((observer: Observer<CartItem>) => {
      this.indexedDbService.getById<CartItem>(EntityTypes.cartItems, id).subscribe(
        (cartItem) => {
          observer.next(cartItem);
          observer.complete();
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
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  removeCartItemById(id: string): void {
    this.indexedDbService.deleteItemByKey(EntityTypes.cartItems, id).subscribe((success) => {});
    this.onCartUpdate.next(true);
  }

  removeCartItemsByIds(ids: string[]): void {
    this.indexedDbService.deleteItemsByKeys(EntityTypes.cartItems, ids).subscribe((success) => {});
    this.onCartUpdate.next(true);
  }
}
