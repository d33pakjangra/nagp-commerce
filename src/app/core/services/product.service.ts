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
    const searchResults: SearchResult[] = [];

    const filterValue = value.toLowerCase();
    const filteredProducts = products.filter(
      (product) => product.name.toLowerCase().includes(filterValue) || product.category.toLowerCase().includes(filterValue)
    );

    const categories = filteredProducts.map((filteredProduct) => {
      return filteredProduct.category;
    });
    const distinctCategories = [...new Set(categories)];

    distinctCategories.forEach((distinctCategory) => {
      searchResults.push({
        text: value,
        category: distinctCategory,
        routerLink: `/products/${filterValue}/${distinctCategory}`,
      });
    });

    if (searchResults.length == 0) {
      searchResults.push({ text: 'No result found', category: '', routerLink: '' });
    }
    return searchResults;
  }
}
