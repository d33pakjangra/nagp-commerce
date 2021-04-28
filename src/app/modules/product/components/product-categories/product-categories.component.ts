import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  @Output() filterByCategory = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onFilterByCategory(category: string): void {
    this.filterByCategory.next(category);
  }
}
