import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    });

    return true;
  }
}
