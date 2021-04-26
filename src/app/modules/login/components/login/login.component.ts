import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscribeLogin();
  }

  subscribeLogin(): void {
    this.authService.isLoggedIn.pipe(untilDestroyed(this)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/'], { replaceUrl: true });
      }
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(untilDestroyed(this))
        .subscribe(
          (isLoggedIn: boolean) => {
            if (isLoggedIn) {
              this.notificationService.success('You have been logged in successfully');
              this.router.navigate(['/'], { replaceUrl: true });
            } else {
              this.notificationService.danger('Your username or password is incorrect');
            }
          },
          (error) => {
            this.notificationService.danger(error);
          }
        );
    }
  }
}
