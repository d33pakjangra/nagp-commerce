import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  public onSearchTextChanged = new Subject<string>();

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'hin']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hin/) ? browserLang : 'en');
  }

  ngOnInit(): void {}

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
}
