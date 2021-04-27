import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() onRemoveCartItem = new EventEmitter<string>();
  @Output() onQuantityChange = new EventEmitter<CartItem>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  navigateToProductDetails(): void {
    this.router.navigate(['/products/', this.cartItem.id]);
  }

  removeCartItem(): void {
    this.onRemoveCartItem.next(this.cartItem.id);
  }

  increaseProductQuantity(): void {
    this.cartItem.quantity = this.cartItem.quantity + 1;
    this.onQuantityChange.next(this.cartItem);
  }

  decreaseProductQuantity(): void {
    this.cartItem.quantity = this.cartItem.quantity - 1;
    this.onQuantityChange.next(this.cartItem);
  }
}
