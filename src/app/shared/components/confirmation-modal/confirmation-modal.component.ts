import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationData } from 'src/app/core/models/confirmation-data';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {}

  ngOnInit(): void {}

  yesClick(): void {
    this.dialogRef.close(true);
  }

  noClick(): void {
    this.dialogRef.close(false);
  }
}
