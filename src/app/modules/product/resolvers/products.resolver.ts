import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productService.getAllProducts();
  }
}
