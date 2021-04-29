import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart-item';
import { Order } from 'src/app/core/models/order';
import { ShippingAddress } from 'src/app/core/models/shipping-address';
import { OrderService } from 'src/app/core/services/order.service';
import { ComponentCanDeactivate } from 'src/app/shared/guards/unsaved-changes.guard';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from 'src/app/core/services/logger.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, ComponentCanDeactivate {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  shippingAddress: ShippingAddress;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly logger: LoggerService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchCartItems();

    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landmark: [''],
      alternatePhone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      addressType: [1],
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return !this.checkoutForm.dirty;
  }

  fetchCartItems(): void {
    this.route.data.subscribe((data) => {
      this.cartItems = data.cartItems;
    });
  }

  checkout(): void {
    if (this.checkoutForm.valid) {
      this.shippingAddress = { ...this.shippingAddress, ...this.checkoutForm.value };
      const order: Order = { id: uuid(), orderedOn: moment().toLocaleString(), orderItems: [] };

      this.cartItems.forEach((cartItem) => {
        order.orderItems.push({ ...cartItem, isDelivered: false, expectedDelivery: moment().add(7, 'days').toLocaleString() });
      });

      this.orderService.createOrder(order).subscribe(
        (success) => {
          this.cartService.removeCartItemsByIds(this.cartItems.map((cartItem) => cartItem.id));
          this.notificationService.success(this.translateService.instant('ORDER.ORDER_SUCCESS'));
        },
        (error) => {
          this.notificationService.danger(this.translateService.instant('ORDER.ORDER_FAILED'));
          this.logger.error('Error while placing order:', error);
        }
      );
    }
  }
}
