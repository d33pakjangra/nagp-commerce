import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
  showingResultsFor = 'ALL_PRODUCTS';
  selectedSortBy = 'PRICE_LTH';

  constructor(private readonly route: ActivatedRoute, private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  filterByCategory(category: string): void {
    this.showingResultsFor = category;
    this.displayedProducts = this.products.filter((product) => product.category === category);
    this.sortProductsBy(this.selectedSortBy);
  }

  getAllProducts(): void {
    this.route.data.subscribe(
      (data) => {
        this.products = data.products;
        this.displayedProducts = this.products;
        this.sortProductsBy(this.selectedSortBy);
      },
      (error) => {
        this.notificationService.danger(`Error while fetching products: ${error}`);
      }
    );
  }

  sortProductsBy(sortBy: string): void {
    this.selectedSortBy = sortBy;

    switch (sortBy.toLowerCase()) {
      case 'price_lth':
        this.displayedProducts = this.displayedProducts.sort((p1, p2) => p1.price - p2.price);
        break;
      case 'price_htl':
        this.displayedProducts = this.displayedProducts.sort((p1, p2) => p2.price - p1.price);
        break;
      case 'rating_htl':
        this.displayedProducts = this.displayedProducts.sort((p1, p2) => p2.rating - p1.rating);
        break;
      default:
        this.displayedProducts = this.displayedProducts.sort((p1, p2) => p1.price - p2.price);
        break;
    }
  }
}
