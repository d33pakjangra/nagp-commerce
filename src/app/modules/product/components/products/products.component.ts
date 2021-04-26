import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/core/models/product';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  showingResultsFor = '';

  constructor(
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.showingResultsFor = this.translateService.instant('PRODUCT.ALL_PRODUCTS');
    this.getAllProducts();
  }

  filterByCategory(category: string): void {
    this.showingResultsFor = category;
    this.displayedProducts = this.products.filter((product) => product.category === category);
  }

  getAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(untilDestroyed(this))
      .subscribe(
        (products) => {
          this.products = products;
          this.displayedProducts = this.products;
        },
        (error) => {
          this.notificationService.danger(`Error while fetching products: ${error}`);
        }
      );
  }
}
