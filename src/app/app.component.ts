import { Component } from '@angular/core';
import { IndexedDbService } from './core/services/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nagp-commerce';

  constructor(private readonly indexedDbService: IndexedDbService) {
    this.indexedDbService.seedDatabase();
  }
}
