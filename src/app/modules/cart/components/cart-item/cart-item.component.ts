import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartItem } from 'src/app/core/models/cart-item';
import { DeleteConfirmation } from 'src/app/core/models/delete-confirmation';
import { DeleteConfirmationModalComponent } from 'src/app/shared/components/delete-confirmation-modal/delete-confirmation-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() removeCartItem = new EventEmitter<string>();
  @Output() quantityChange = new EventEmitter<CartItem>();

  constructor(private readonly router: Router, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  navigateToProductDetails(): void {
    this.router.navigate(['/products/', this.cartItem.id]);
  }

  confirmRemoveCartItem(): void {
    this.matDialog
      .open(DeleteConfirmationModalComponent, {
        width: '450px',
        data: {
          header: 'CART.REMOVE_ITEM',
          message: 'CART.ARE_YOU_SURE',
        } as DeleteConfirmation,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.removeCartItem.next(this.cartItem.id);
        }
      });
  }

  increaseProductQuantity(): void {
    this.cartItem.quantity = this.cartItem.quantity + 1;
    this.quantityChange.next(this.cartItem);
  }

  decreaseProductQuantity(): void {
    this.cartItem.quantity = this.cartItem.quantity - 1;
    this.quantityChange.next(this.cartItem);
  }

  disableDecreaseQuantityButton(): boolean {
    return this.cartItem.quantity === 1;
  }

  disableIncreaseQuantityButton(): boolean {
    return this.cartItem.quantity === 4;
  }
}
