import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { EntityTypes } from '../constants';
import { Product } from '../models/product';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly indexedDbService: IndexedDbService) {}

  getAllProducts(): Observable<Product[]> {
    return new Observable((observer: Observer<Product[]>) => {
      this.indexedDbService.getAll<Product>(EntityTypes.products).subscribe(
        (products) => {
          observer.next(products);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getProductById(id: string): Observable<Product> {
    return new Observable((observer: Observer<Product>) => {
      this.indexedDbService.getById<Product>(EntityTypes.products, id).subscribe(
        (product) => {
          observer.next(product);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
