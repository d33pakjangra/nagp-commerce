import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/core/models/order-item';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem: OrderItem;
  @Input() orderId: string;

  constructor() {}

  ngOnInit(): void {}
}
