import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CountService } from 'src/app/core/services/count.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('languagesMenuTrigger') languagesMenuTrigger: MatMenuTrigger;
  @ViewChild('userMenuTrigger') userMenuTrigger: MatMenuTrigger;
  @ViewChild('searchText', { static: false }) searchControl: HTMLInputElement;

  cartItemCount = 0;
  headerName = 'NAGP Commerce';
  searchText: string;
  isLoggedIn = false;
  username: string;

  constructor(
    public readonly translateService: TranslateService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly countService: CountService
  ) {}

  ngOnInit(): void {
    this.subscribeLogin();
    this.subscribeCartItemCount();
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

  openLanguageMenu(): void {
    this.languagesMenuTrigger.openMenu();
  }

  openUserMenu(): void {
    this.userMenuTrigger.openMenu();
  }

  closeLanguageMenu(): void {
    this.languagesMenuTrigger.closeMenu();
  }

  closeUserMenu(): void {
    this.userMenuTrigger.closeMenu();
  }
}
