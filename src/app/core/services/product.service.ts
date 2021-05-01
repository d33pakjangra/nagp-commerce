import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { EntityTypes } from '../constants';
import { Product } from '../models/product';
import { SearchResult } from '../models/search-result';
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
          observer.complete();
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
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  applySearchFilter(products: Product[], value: string): SearchResult[] {
    const results: SearchResult[] = [];

    const filterValue = value.toLowerCase();
    const filteredProducts = products.filter(
      (product) => product.name.toLowerCase().includes(filterValue) || product.category.toLowerCase().includes(filterValue)
    );
    filteredProducts.forEach((filteredProduct) => {
      results.push({
        text: filteredProduct.name,
        category: filteredProduct.category,
        routerLink: `/products/${filterValue}/${filteredProduct.category}`,
      });
    });

    return results;
  }
}
