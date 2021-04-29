import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationData } from 'src/app/core/models/confirmation-data';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private readonly matDialog: MatDialog) {}

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate() ? true : this.openUnsavedChangesDialog();
  }

  openUnsavedChangesDialog(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.matDialog
        .open(ConfirmationModalComponent, {
          width: '450px',
          data: {
            header: 'SHARED.UNSAVED_CHANGES',
            message: 'SHARED.UNSAVED_CHANGES_MESSAGE',
          } as ConfirmationData,
        })
        .afterClosed()
        .subscribe(
          (confirmed: boolean) => {
            observer.next(confirmed);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }
}
