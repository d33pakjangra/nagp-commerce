import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CountService } from 'src/app/core/services/count.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product';
import { LoggerService } from 'src/app/core/services/logger.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SearchResult } from 'src/app/core/models/search-result';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('languagesMenuTrigger') languagesMenuTrigger: MatMenuTrigger;
  @ViewChild('userMenuTrigger') userMenuTrigger: MatMenuTrigger;

  cartItemCount = 0;
  headerName = 'NAGP Commerce';
  searchText = new FormControl();
  isLoggedIn = false;
  username: string;
  products: Product[] = [];
  searchedResults: Observable<SearchResult[]>;

  constructor(
    public readonly translateService: TranslateService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly countService: CountService,
    private readonly productService: ProductService,
    private readonly logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.subscribeLogin();
    this.subscribeCartItemCount();
    this.getAllProducts();
    this.subscribeSearchText();
  }

  subscribeSearchText(): void {
    this.searchedResults = this.searchText.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 2 ? this.productService.applySearchFilter(this.products, value) : []))
    );
  }

  getAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(untilDestroyed(this))
      .subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          this.logger.error('Error while fetching products data: ', error);
        }
      );
  }

  subscribeLogin(): void {
    this.authService.isLoggedIn.pipe(untilDestroyed(this)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.username = this.authService.getUsername();
    });
  }

  subscribeCartItemCount(): void {
    this.countService.onCartItemCountChange.pipe(untilDestroyed(this)).subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/products']);
  }
}
