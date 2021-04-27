import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/core/models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;

  constructor() {}

  ngOnInit(): void {}
}
