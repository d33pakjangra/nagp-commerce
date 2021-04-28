import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
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
  @ViewChild(MatMenuTrigger) languagesMenuTrigger: MatMenuTrigger;
  @ViewChild('searchText', { static: false }) searchControl: HTMLInputElement;

  cartItemCount = 0;
  headerName = 'NAGP Commerce';
  searchText: string;
  isLoggedIn = false;

  constructor(
    public translate: TranslateService,
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
    });
  }

  subscribeCartItemCount(): void {
    this.countService.onCartItemCountChange.pipe(untilDestroyed(this)).subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  openLanguagesMenu(): void {
    this.languagesMenuTrigger.openMenu();
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.authService.logout();
  }
}
