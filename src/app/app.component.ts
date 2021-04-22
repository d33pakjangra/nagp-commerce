import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IndexedDbService } from './core/services/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nagp-commerce';

  constructor(private readonly indexedDbService: IndexedDbService, public translate: TranslateService) {
    this.indexedDbService.seedDatabase();
    translate.addLangs(['en', 'hin']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hin/) ? browserLang : 'en');
  }
}
