import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private readonly productService: ProductService, private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this.notificationService.danger(`Error while fetching products: ${error}`);
      }
    );
  }
}
