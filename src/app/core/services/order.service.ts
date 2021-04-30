import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { EntityTypes } from '../constants';
import { Order } from '../models/order';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly indexedDbService: IndexedDbService) {}

  createOrder(order: Order): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.indexedDbService
        .addUpdateItems<Order>(EntityTypes.orders, [order])
        .subscribe(
          (success) => {
            observer.next(success);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  getAllOrders(): Observable<Order[]> {
    return new Observable((observer: Observer<Order[]>) => {
      this.indexedDbService.getAll<Order>(EntityTypes.orders).subscribe(
        (orders) => {
          observer.next(orders);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
