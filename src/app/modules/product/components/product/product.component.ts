import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  navigateToProductDetails(): void {
    this.router.navigate(['/products/', this.product.id]);
  }
}
