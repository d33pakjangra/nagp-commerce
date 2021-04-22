import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) languagesMenuTrigger: MatMenuTrigger;
  @ViewChild('searchText', { static: false }) searchControl: HTMLInputElement;

  headerName: string = 'NAGP Commerce';
  searchText: string;
  isLoggedIn: boolean = false;
  public onSearchTextChanged = new Subject<string>();

  constructor(public translate: TranslateService, private readonly router: Router, private readonly authService: AuthService) {
    this.subscribeLogin();
  }

  ngOnInit(): void {}

  subscribeLogin() {
    this.authService.isLoggedIn.pipe(untilDestroyed(this)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  clearSearch() {
    this.searchText = null;
    this.onSearchTextChanged.next(null);
  }

  openLanguagesMenu() {
    this.languagesMenuTrigger.openMenu();
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  navigateToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  logout() {
    this.authService.logout();
  }
}
