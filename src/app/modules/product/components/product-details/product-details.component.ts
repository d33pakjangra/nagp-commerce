import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartItem } from 'src/app/core/models/cart-item';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { LoggerService } from 'src/app/core/services/logger.service';

@UntilDestroy()
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly logger: LoggerService,
    private readonly loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail(): void {
    this.route.data.subscribe(
      (data) => {
        this.product = data.product;
      },
      (error) => {
        this.logger.error('Error while fetching product detail: ', error);
      }
    );
  }

  addToCart(product: Product): void {
    this.loader.showLoader();

    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    this.cartService
      .addProductToCart(cartItem)
      .pipe(untilDestroyed(this))
      .subscribe(
        (success) => {
          this.loader.hideLoader();
          this.router.navigate(['/cart']);
        },
        (error) => {
          this.loader.hideLoader();
          this.logger.error('Error while adding product into the cart: ', error);
        }
      );
  }
}
