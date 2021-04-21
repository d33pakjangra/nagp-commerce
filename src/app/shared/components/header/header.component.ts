import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerName: string = 'NAGP Commerce';
  searchText: string;
  public onSearchTextChanged = new Subject<string>();

  constructor() {}

  ngOnInit(): void {}

  clearSearch() {
    this.searchText = null;
    this.onSearchTextChanged.next(null);
  }
}
