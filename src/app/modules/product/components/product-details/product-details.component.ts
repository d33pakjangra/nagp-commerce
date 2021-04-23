import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params.id;
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: number): void {
    const x = this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        this.notificationService.danger(`Error while fetching product detail: ${error}`);
      }
    );
  }

  addToCart(product: Product) {
    //this.productService.addToCart(product);
  }
}
