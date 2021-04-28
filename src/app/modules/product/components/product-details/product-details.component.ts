import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartItem } from 'src/app/core/models/cart-item';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';

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
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private readonly cartService: CartService,
    private readonly logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string): void {
    this.productService
      .getProductById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          this.notificationService.danger(`Error while fetching product detail: ${error}`);
        }
      );
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      brand: product.brand,
      color: product.color,
      price: product.price,
      rating: product.rating,
      quantity: 1,
      seller: product.seller,
      maxQuantityAllowed: product.maxQuantityAllowed,
    };

    this.cartService
      .addProductToCart(cartItem)
      .pipe(untilDestroyed(this))
      .subscribe(
        (success) => {
          this.router.navigate(['/cart']);
        },
        (error) => {
          this.notificationService.danger('Error while adding product into the cart.');
          this.logger.error('Error while adding product into the cart: ', error);
        }
      );
  }
}
