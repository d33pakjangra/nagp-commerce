import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
        console.log(this.orders);
        // TODO: Add sort by date
      },
      (error) => {
        this.logger.error(`Error while fetching products: ${error}`);
      }
    );
  }
}
