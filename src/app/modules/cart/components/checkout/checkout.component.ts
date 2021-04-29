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
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      locality: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      landmark: new FormControl(''),
      alternatePhone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      addressType: new FormControl(1),
    });
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
