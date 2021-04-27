import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/core/models/cart-item';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.scss'],
})
export class PriceDetailsComponent implements OnInit {
  @Input() cartItems: CartItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  calculatePrice(): number {
    return this.cartItems.reduce((prev, cur) => {
      return prev + cur.price * cur.quantity;
    }, 0);
  }
}
