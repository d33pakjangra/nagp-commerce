import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
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
  returnUrl: string;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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
    this.activatedRoute.queryParamMap.subscribe((paramMap: any) => {
      this.returnUrl = paramMap.params.returnUrl || '/';
      if (this.loginForm.valid) {
        this.authService
          .login(this.loginForm.value.username, this.loginForm.value.password)
          .pipe(untilDestroyed(this))
          .subscribe(
            (isLoggedIn: boolean) => {
              if (isLoggedIn) {
                this.notificationService.success(this.translateService.instant('LOGIN.LOGIN_SUCCESS'));
                this.router.navigateByUrl(this.returnUrl);
              } else {
                this.notificationService.danger(this.translateService.instant('LOGIN.LOGIN_FAILED'));
              }
            },
            (error) => {
              this.notificationService.danger(error);
            }
          );
      }
    });
  }
}
