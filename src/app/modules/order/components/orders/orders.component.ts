import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Order } from 'src/app/core/models/order';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private readonly logger: LoggerService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.route.data.subscribe(
      (data) => {
        this.orders = data.orders;
        this.orders = this.orders.sort((a, b) => new Date(b.orderedOn).getTime() - new Date(a.orderedOn).getTime());
      },
      (error) => {
        this.logger.error(`Error while fetching products: ${error}`);
      }
    );
  }
}
