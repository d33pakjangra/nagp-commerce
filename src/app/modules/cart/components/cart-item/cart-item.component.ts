import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from 'src/app/core/models/cart-item';
import { ConfirmationData } from 'src/app/core/models/confirmation-data';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

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

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  navigateToProductDetails(): void {
    this.router.navigate(['/products/', this.cartItem.id]);
  }

  confirmRemoveCartItem(): void {
    this.matDialog
      .open(ConfirmationModalComponent, {
        width: '450px',
        data: {
          header: 'CART.REMOVE_ITEM',
          message: 'CART.ARE_YOU_SURE',
        } as ConfirmationData,
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
    if (this.cartItem.quantity === this.cartItem.maxQuantityAllowed) {
      this.notificationService.danger(
        this.translateService.instant('CART.MAX_QUANTITY_REACHED', { maxAllowedQuantity: this.cartItem.maxQuantityAllowed })
      );
    } else {
      this.cartItem.quantity = this.cartItem.quantity + 1;
      this.notifyQuantityChanged();
      this.quantityChange.next(this.cartItem);
    }
  }

  decreaseProductQuantity(): void {
    this.cartItem.quantity = this.cartItem.quantity - 1;
    this.notifyQuantityChanged();
    this.quantityChange.next(this.cartItem);
  }

  disableDecreaseQuantityButton(): boolean {
    return this.cartItem.quantity === 1;
  }

  notifyQuantityChanged(): void {
    this.notificationService.success(
      this.translateService.instant('CART.QUANTITY_CHANGED', { cartItem: this.cartItem.name, quantity: this.cartItem.quantity })
    );
  }
}
