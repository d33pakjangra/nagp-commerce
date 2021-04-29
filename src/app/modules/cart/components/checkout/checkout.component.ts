import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchCartItems();

    this.checkoutForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      pincode: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      landmark: new FormControl(''),
      alternatePhone: new FormControl(''),
      addressType: new FormControl('', [Validators.required]),
    });
  }

  fetchCartItems(): void {
    this.route.data.subscribe((data) => {
      this.cartItems = data.cartItems;
    });
  }

  checkout(): void {}
}
