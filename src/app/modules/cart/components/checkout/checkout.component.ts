import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart-item';
import { ComponentCanDeactivate } from 'src/app/shared/guards/unsaved-changes.guard';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, ComponentCanDeactivate {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly formBuilder: FormBuilder) {}

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
      console.log(this.checkoutForm);
    }
  }
}
