import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartItem } from 'src/app/core/models/cart-item';
import { CartService } from 'src/app/core/services/cart.service';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private readonly cartService: CartService, private readonly router: Router) {}

  ngOnInit(): void {
    this.fetchCartItems();
  }

  private fetchCartItems(): void {
    this.cartService
      .getAllProductFromCart()
      .pipe(untilDestroyed(this))
      .subscribe((cartItems) => {
        this.cartItems = cartItems;
      });
  }

  onRemoveCartItem(id: string): void {
    this.cartService.removeCartItemById(id);
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== id);
  }

  onQuantityChange(cartItem: CartItem): void {
    this.cartService.addProductToCart(cartItem).subscribe((success) => {});
  }

  navigateToCheckout(): void {
    this.router.navigate(['/cart/checkout']);
  }
}
