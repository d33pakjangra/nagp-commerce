import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar) {}

  success(message: string, options: { delay?: number } = {}) {
    this.snackBar.open(message, '', {
      panelClass: ['success-snackbar'],
      duration: options.delay || 3000,
    });
  }

  danger(message: string, options: { delay?: number } = {}) {
    this.snackBar.open(message, 'X', {
      panelClass: ['error-snackbar'],
      duration: options.delay || 3000,
    });
  }
}
